var express = require('express');
var router = express.Router();
var models = require('../models');


router.get('/', function(req, res, next) {
  models.users
    .findAll()
    .then(usersFound => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(usersFound));
    });
});

router.post('/login', function(req, res, next) {
  models.users
    .findAll({
      where: {
        Username: req.body.username,
        Password: req.body.password
      }
    })
    .then(users => {
      if (users) {
        res.send('Login succeeded!');
      } else {
        res.send('Invalid login!');
      }
    });
});

/* GET USER BY USERID */
router.get('/:UserId', function(req, res, next) {
  models.users
    .findById(parseInt(req.params.UserId), {})
    .then(userFound => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(userFound));
    })
});



module.exports = router;
