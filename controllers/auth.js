const pool = require('../database').pool;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.register = async (req, res) => {
    const {username, password, passwordConfirm, key} = req.body;
    let usernames = await pool.query('SELECT username FROM auth WHERE username = ?', [username]);
    let keys = await pool.query('SELECT name FROM authkeys WHERE name = ?', [key]);

    if(usernames.length > 0) {
        return res.status(409).render('register', {
            ERR_USERNAME_IN_USE: 'Username already in use.',
            ERR_PASSWORDS_NOT_MATCHING: undefined,
            ERR_INVALID_KEY: undefined
        });

    } else if(password !== passwordConfirm) {
        return res.status(401).render('register', {
            ERR_PASSWORDS_NOT_MATCHING: 'Passwords do not match.',
            ERR_INVALID_KEY: undefined,
            ERR_USERNAME_IN_USE: undefined
        });

    } else if(keys.length === 0) {
        return res.status(401).render('register', {
            ERR_INVALID_KEY: 'Key is either invalid, expired or already in use.',
            ERR_USERNAME_IN_USE: undefined,
            ERR_PASSWORDS_NOT_MATCHING: undefined
        });
    }

    await pool.query('DELETE FROM authkeys WHERE name = ?', [key])

    let hashedPassword = await bcrypt.hash(password, 8);
    const token = jwt.sign({uid: Math.random()*1000000000000000}, process.env.JWT_SECRET);
    
    await pool.query('INSERT INTO auth(username,hashedPassword,usedKey,isHalted,apiKey) VALUES(?,?,?,?,?)', [username, hashedPassword, key, 0, token]);
    
    let theUser = await pool.query('SELECT * FROM auth WHERE username = ?', [username])
    const user = {
        username,
        key,
        uid:theUser[0].id,
        apiKey:theUser[0].apiKey,
        isHalted: theUser[0].isHalted,
        createdAt: theUser[0].createdAt
    }
    req.session.user = user;
    res.status(200).redirect("/");
};

exports.login = async (req, res) => {
    const {username, password} = req.body;

    let theUser = await pool.query('SELECT * FROM auth WHERE username = ?', [username])

    if(theUser.length === 0) {
        return res.status(403).render('login', {
            ERR_INVALID_ACCOUNT_DATA: 'Invalid account data.'
        });
    }

    if(!theUser || !(await bcrypt.compare(password, theUser[0].hashedPassword))) {
        res.status(401).render('login', {
            ERR_INVALID_ACCOUNT_DATA: 'Invalid account data.'
        });
    } else {

        const user = {
            username,
            key: theUser[0].usedKey,
            uid: theUser[0].id,
            apiKey: theUser[0].apiKey,
            isHalted: theUser[0].isHalted,
            createdAt: theUser[0].createdAt
        }
        req.session.user = user;
        res.status(200).redirect("/");
    }
};