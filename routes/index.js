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

/* CREATE A USER IN THE DATABASE - WORKING*/ 
router.post('/', function(req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Username: req.body.username
      },
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Email: req.body.email,
        Password: req.body.password
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
