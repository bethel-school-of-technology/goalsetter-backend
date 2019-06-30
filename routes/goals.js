var express = require('express');
var router = express.Router();
var models = require('../models');

// router.get('/', function(req, res, next) {
//   models.goals
//     .findAll()
//     .then(goalsFound => {
//       res.setHeader('Content-Type', 'application/json');
//       res.send(JSON.stringify(goalsFound));
//     });
// });

/* GET GOALS FOR SPECIFIC USER IN DATABASE */
router.get('/:userId', (req, res, next) => {
  models.goals
  .findAll({
    where: {
      userId: req.params['userId']
    }
  })
  .then(userGoals => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(userGoals));
  }, error => {
    console.log("ERROR: ", error),
    res.status(400).send("Could not find goals for userId");
  })
})

/* CREATE A GOAL IN THE DATABASE - WORKING*/ 
router.post('/', function(req, res, next) {
  console.log("REQUEST BODY", req.body);
  models.goals
    .findOrCreate({
      where: {
        Goal: req.body.Goal,
      },
      defaults: {
        userId: req.body.userId,
        DateFinished: req.body.DateFinished,
        Reminder: req.body.Reminder,
        Notes: req.body.Notes,
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.send('Goal Created');
      } else {
        res.send('This Goal already exists');
      }
    });
});
 
module.exports = router;
