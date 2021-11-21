const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { pool } = require('../database');

exports.register = async (req, res) => {
  const {
    username, password, passwordConfirm, key,
  } = req.body;
  const usernames = await pool.query('SELECT username FROM auth WHERE username = ?', [username]);
  const keys = await pool.query('SELECT name FROM authkeys WHERE name = ?', [key]);

  if (usernames.length > 0) {
    return res.status(409).render('register', {
      ERR_USERNAME_IN_USE: 'Username already in use.',
      ERR_PASSWORDS_NOT_MATCHING: undefined,
      ERR_INVALID_KEY: undefined,
    });
  } if (password !== passwordConfirm) {
    return res.status(401).render('register', {
      ERR_PASSWORDS_NOT_MATCHING: 'Passwords do not match.',
      ERR_INVALID_KEY: undefined,
      ERR_USERNAME_IN_USE: undefined,
    });
  } if (keys.length === 0) {
    return res.status(401).render('register', {
      ERR_INVALID_KEY: 'Key is either invalid, expired or already in use.',
      ERR_USERNAME_IN_USE: undefined,
      ERR_PASSWORDS_NOT_MATCHING: undefined,
    });
  }

  await pool.query('DELETE FROM authkeys WHERE name = ?', [key]);

  const hashedPassword = await bcrypt.hash(password, 8);
  const token = jwt.sign({ uid: Math.random() * 1000000000000000 }, process.env.JWT_SECRET);

  await pool.query('INSERT INTO auth(username,hashedPassword,usedKey,isHalted,apiKey) VALUES(?,?,?,?,?)', [username, hashedPassword, key, 0, token]);

  const theUser = await pool.query('SELECT * FROM auth WHERE username = ?', [username]);
  const user = {
    username,
    key,
    uid: theUser[0].id,
    apiKey: theUser[0].apiKey,
    isHalted: theUser[0].isHalted,
    createdAt: theUser[0].createdAt,
  };
  req.session.user = user;
  return res.status(200).redirect('/');
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const theUser = await pool.query('SELECT * FROM auth WHERE username = ?', [username]);

  if (theUser.length === 0) {
    return res.status(403).render('login', {
      ERR_INVALID_ACCOUNT_DATA: 'Invalid account data.',
    });
  }

  if (!theUser || !(await bcrypt.compare(password, theUser[0].hashedPassword))) {
    return res.status(401).render('login', {
      ERR_INVALID_ACCOUNT_DATA: 'Invalid account data.',
    });
  }
  const user = {
    username,
    key: theUser[0].usedKey,
    uid: theUser[0].id,
    apiKey: theUser[0].apiKey,
    isHalted: theUser[0].isHalted,
    createdAt: theUser[0].createdAt,
  };
  req.session.user = user;
  return res.status(200).redirect('/');
};
