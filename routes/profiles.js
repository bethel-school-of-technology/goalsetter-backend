var express = require('express');
var router = express.Router();
var models = require('../models'); 
var authService = require('../services/auth');


router.get('/', function(req, res, next) {
  models.users
    .findAll()
    .then(usersFound => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(usersFound));
    });
});

  router.get('/logout', function (req, res, next) {
    res.cookie('jwt', "", { expires: new Date(0) });
    res.send('Logged out');
    });





module.exports = router;

