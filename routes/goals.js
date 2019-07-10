var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');



router.get('/', (req, res, next) => {
    // middleware to check who's making the request. using the jwt token. 
    // user id = 1 
    let jwtAuthToken = req.header('Authorization');
    jwtAuthToken = jwtAuthToken.slice(7, jwtAuthToken.length);
    const authUserId = authService.verifyUser(jwtAuthToken);

    console.log("======== JWT AUTH TOKEN ==========", jwtAuthToken);
    console.log("======== authUserId ==========", authUserId);
    models.goals
        .findAll({
            where: {
                userId: authUserId
            }
        })
        .then(goalsFound => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(goalsFound));
        });
});


router.get('/:GoalId', (req, res, next) => {
    models.goals
        .findOne({
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
router.post('/', function (req, res, next) {
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
        .spread(function (result, created) {
            if (created) {
                res.send('Goal Created');
            } else {
                res.send('This Goal already exists');
            }
        });
});

/* UPDATE A GOAL IN THE DATABASE - WORKING*/
router.put('/:GoalId', function (req, res, next) {
    console.log("REQUEST BODY", req.body);
    models.goals.update(req.body, {
        where: {
            GoalId: req.params.GoalId
        }
    })
        .then(updatedGoal => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(updatedGoal));
            console.log("THIS IS:", this.updatedGoal)
        }, error => {
            console.log("ERROR: ", error),
                res.status(400).send("Could not find goals for userId");
        })
})

/*DELETE A GOAL*/
router.delete("/:GoalId", function (req, res, next) {
    // console.log("+++REQUEST BODY++++", req.body);
    // let Id = parseInt(req.params.GoalId);
    models.goals
        .destroy({
            where: { GoalId: req.params.GoalId }
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
