var express = require('express');
var router = express.Router();
var models = require('../models');
var staticGoals = require('../staticModels/goals');


router.get('/staticGoals', function (req, res, next) {
res.send(JSON.stringify(
    staticGoals.goal
  ));
});

router.get('/', function(req, res, next) {
  models.goals
    .findAll()
    .then(goalsFound => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(goalsFound));
    });
});

/* POSSIBLE ASSOCIATION FRAMEWORK */
// router.post('/', function (req, res, next) {
//   let token = req.cookies.jwt;
//   authService.verifyUser(token)
//     .then(user => {
//       if (user) {
//         res.send(JSON.stringify(user));
//       } else {
//         res.status(401);
//         res.send('Must be logged in');
//       }
//     })
// });
/* CREATE A GOAL IN THE DATABASE - WORKING BUT NOT ASSOCIATING*/ 
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
        res.send('Goal successfully created');
      } else {
        res.send('This Goal already exists');
      }
    });
});

module.exports = router;
