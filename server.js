var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
//creates cookies and underline session
var session = require('express-session');
var passport = require('passport');

var connection = require('./db/connection');
var login = require('./routes/login');
var register = require('./routes/register');

require('./auth/setup');


connection.connect();

var app = express();

//happen before passport session
var sessionConfig = {
  //not shared with people. searches for it in the environment
  secret: process.env.SECRET || 'super secrect key goes here',
  key: 'user',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 50 * 1000, //30 mins. Cookie should only last 30min
    secure: false
  }
}


app.use(session(sessionConfig));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

app.use('/login', login);
app.use('/register', register);

app.get('/loginStatus', function (req,res){
  res.send(req.isAuthenticated());
})

app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

var server = app.listen(3000, function() {
  console.log('Listening on port', server.address().port);
});
