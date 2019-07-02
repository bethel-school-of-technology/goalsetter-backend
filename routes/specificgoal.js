var express = require('express');
var router = express.Router();
var models = require('../models');


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

module.exports = router;
