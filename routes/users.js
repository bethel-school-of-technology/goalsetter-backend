var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
var models = require('../models/users');

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.get('/users', function(req, res, next) {
  models.users
    .findAll({include: [{ model: models.users }]})
    .then(usersFound => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(usersFound));
    });
});



module.exports = router;
