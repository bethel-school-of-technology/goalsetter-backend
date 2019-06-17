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

module.exports = router;
