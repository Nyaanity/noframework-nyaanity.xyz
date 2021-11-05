const express = require('express');
const { resolveInclude } = require('ejs');
const app = express();
const session = require('express-session');
// Newt was here HAHAHHAH
app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.use(express.urlencoded({extended: false}));
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


// Routes

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/api'));
app.use('/admin', require('./routes/admin'));

app.listen(5656, () => {
    console.log('Server started on port 80');
});
