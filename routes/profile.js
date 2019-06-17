var express = require('express');
var router = express.Router();
var models = require('../models'); 
var authService = require('../services/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
 });

router.get('/profile', function (req, res, next) {
    let token = req.cookies.jwt;
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          res.send(JSON.stringify(user));
        } else {
          res.status(401);
          res.send('Must be logged in');
        }
      })
  });


  module.exports = router;