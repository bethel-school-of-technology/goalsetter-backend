var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');
var cors = require("cors");
var models = require('./models');
var passport = require('passport');  // <--- Add this code to your declarations
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goalsRouter = require('./routes/goals');
var profilegoalsRouter = require('./routes/profilegoals');
var signupUserRouter = require('./routes/signupUser');
var app = express();
var bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
//const exjwt = require('express-jwt');
// app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'perilous journey' }));
app.use(passport.initialize());  
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/goals', goalsRouter);
app.use('/profilegoals', profilegoalsRouter);
app.use('/signupUser', signupUserRouter);

/* CORS CODE */
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
  
models.sequelize.sync({ logging: (msg) => console.log(msg) }).then(function () {
  console.log("DB Sync'd up")
});





    

  


module.exports = app;
