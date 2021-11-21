const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

// router.get('/login', (req, res) => {
//     const user = {
//         username: "someuser",
//     }
//     req.session.user = user
//     res.redirect("/")
// });

router.get('/logout', /* forceAuth, */ (req, res) => {
  if (!req.session.user) {
    res.status(401).send('Unauthorized. Please log in first.');
    return;
  }
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
