var express = require('express');
var router = express.Router();
var models = require('../models');
var staticModels = require('../staticModels/planets');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
 });

 /* FIRST TEST TO CONNECT FRONTEND WITH BACKEND - WORKING */
router.get('/staticPlanets', function (req, res, next) {
  res.send(JSON.stringify(
    staticModels.planet
  ));
});

/* CREATE A USER IN THE DATABASE - WORKING */ 
router.post('/', function(req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Email: req.body.Email
      },
      defaults: {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Password: req.body.Password
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.send('signup');
      } else {
        res.send('This user already exists');
      }
    });
});

/* LOGIN PAGE */
router.post('/login', function(req, res, next) {
  models.users
    .findOne({
      where: {
        Email: req.body.Email,
        Password: req.body.Password
      }
    })
    .then(user => {
      if (user) {
        res.redirect('profile' + user.UserId);
      } else {
        res.send('Invalid login!');
      }
    });
});

/* DISPLAY ALL USERS TO HOMEPAGE - WORKING */
router.get('/allusers', function(req, res, next) {
  models.users
    .findAll()
    .then(usersFound => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(usersFound));
    });
});



module.exports = router;
