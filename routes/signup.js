var express = require('express');
var router = express.Router();
var models = require('../models');


/* USER SIGNUP */
router.post('/', function(req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Email: req.body.Email,
      },
      defaults: {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Password: req.body.Password
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.send('User successfully created');
      } else {
        res.send('This user already exists');
      }
    });
});


module.exports = router;
