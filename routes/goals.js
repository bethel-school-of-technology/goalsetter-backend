var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');


router.get('/', function(req, res, next) {
  models.goals
    .findAll()
    .then(goalsFound => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(goalsFound));
    });
});


/* CREATE A USER IN THE DATABASE - WORKING*/ 
router.post('/', function(req, res, next) {
  models.goals
    .findOrCreate({
      where: {
        Goal: req.body.Goal
      },
      defaults: {
        DateFinished: req.body.DateFinished,
        Reminder: req.body.Reminder,
        Notes: req.body.Notes
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.redirect('profile');
      } else {
        res.send('This Goal already exists');
      }
    });
});
  
/* CREATE A GOAL IN THE DATABASE - WORKING BUT NOT ASSOCIATING*/ 
// router.post('/', function(req, res, next) {
  // models.goals
  //   .findOrCreate({
//       where: {
//         Goal: req.body.Goal
//       },
//       defaults: {
//         DateFinished: req.body.DateFinished,
//         Reminder: req.body.Reminder,
//         Notes: req.body.Notes
//       }
//     })
//     .spread(function(result, created) {
//       if (created) {
//         res.send('Goal successfully created');
//       } else {
//         res.send('This Goal already exists');
//       }
//     });
// });

module.exports = router;
