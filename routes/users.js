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

/* USER LOGIN */
router.post('/login', function(req, res, next) {
  models.users
    .findAll({
      where: {
        Email: req.body.Email,
        Password: req.body.Password
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

/* GET USER BY PRIMARY KEY */
router.get('/profile/:id', function(req, res, next) {
  models.users
    .findByPk(parseInt(req.params.id))
    .then(user => {
      if (user){
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify('Welcome ' + user.FirstName));
    } else {
res.send('User not Found');
    }
  });
});

/* CREATE A USER IN THE DATABASE - WORKING*/ 
router.post('/signup', function(req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Username: req.body.Username
      },
      defaults: {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Password: req.body.Password
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.redirect('signup');
      } else {
        res.send('This user already exists');
      }
    });
});



module.exports = router;
