const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { user: req.session.user });
});

router.get('/profile', (req, res) => {
  if (!req.session.user) {
    res.status(401).send('Unauthorized. Please log in first.');
  } else {
    res.render('profile', { user: req.session.user });
  }
});

router.get('/register', (req, res) => {
  res.render('register', {
    ERR_PASSWORDS_NOT_MATCHING: undefined,
    ERR_INVALID_KEY: undefined,
    ERR_USERNAME_IN_USE: undefined,
  });
});

router.get('/login', (req, res) => {
  res.render('login', {
    ERR_INVALID_ACCOUNT_DATA: undefined,
  });
});

module.exports = router;
