var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_user',
    password: 'some_secret',
    database: 'the_app_database'
  })
  
  connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected...')
  })
module.exports = app;
