const express = require('express');

const app = express();
const session = require('express-session');

app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.use(express.urlencoded({
  extended: false,
}));

app.use(express.json());

app.use(session({
  secret: '12345abcdeedcba54321',
  resave: false,
  saveUninitialized: false,
  expires: 604800000,
}));

app.get('/social', (req, res) => {
  res.render('social');
});

app.get('/aboutme', (req, res) => {
  res.render('aboutme');
});

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/api'));
app.use('/admin', require('./routes/admin'));

app.listen(5656);
