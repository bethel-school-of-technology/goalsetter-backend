var express = require('express');
var router = express.Router();
var models = require('../models');
var cookieParser = require('cookie-parser')
var cors = require('cors');
var app = express();

app.use(cors())

router.get('/', (req, res, next) => {
  // middleware to check who's making the request. using the jwt token. 
  // user id = 1 
  console.log(this.cors);
  models.goals
    .findAll({
      
    })
    .then(goalsFound => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(goalsFound));
    });
});

// GET /goals/{id}
router.get('/:goalId', (request, response, next) => {
  // goalid 
  // find a goal with an id = goalID
  // reutrn the json response. 
});

/* GET GOALS FOR SPECIFIC USER IN DATABASE */
// router.get('/:userId', (req, res, next) => {
//   models.goals
//   .findAll({
//     where: {
//       userId: req.params['userId']
//     }
//   })
  
//   .then(payload => {
//     res.setHeader('Content-Type', 'application/json');
//     res.send(JSON.stringify(payload));
//   }, error => {
//     console.log("ERROR: ", error),
//     res.status(400).send("Could not find goals for userId");
//   })
// })

/* GET GOALS FOR SPECIFIC USER IN DATABASE */
router.get('/:GoalId', (req, res, next) => {
  models.goals
  .findAll({
    where: {
      GoalId: req.params['GoalId']
    }
  })
  .then(specificGoals => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(specificGoals));
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

/* CREATE A GOAL IN THE DATABASE - WORKING*/ 
router.put('/', function(req, res, next) {
  console.log("REQUEST BODY", req.body);
  models.goals.update(req.body, {
      where: {
        GoalId: req.body.GoalId
      },
    })
  //   .spread(function (rowsUpdated) {
  //     res.json(rowsUpdated)
  //   })
  //   .catch(next)
  //  });
  .then(updatedGoal => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(updatedGoal));
    console.log("THIS IS:", this.updatedGoal)
  }, error => {
    console.log("ERROR: ", error),
    res.status(400).send("Could not find goals for userId");
  })
})
    
router.delete("/:id", function (req, res, next) {
  let Id = parseInt(req.params.id);
  models.goals
    .destroy({
      where: { GoalId: Id }
    })
    .then(result => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(result));
      console.log("THIS IS:", this.result)
    }, error => {
      console.log("ERROR: ", error),
      res.status(400).send("Could not find goals for userId");
    })
  })
 
module.exports = router;
