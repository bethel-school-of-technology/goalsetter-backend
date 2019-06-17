var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');


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
router.post('/', function (req, res, next) {
  jwt.verify(req.token, 'secretkey', (err, authorizedData) => {
    if(err){
        //If error send Forbidden (403)
        console.log('ERROR: Could not connect to the protected route');
        res.sendStatus(403);
    } else {
        //If token is successfully verified, we can send the autorized data 
        res.json({
            message: 'Successful log in',
            authorizedData
        });
        console.log('SUCCESS: Connected to protected route');
    }
})
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
