var express = require('express');
var router = express.Router();
//var mysql = require('mysql2');
var models = require('../models');
var staticGoals = require('../staticModels/goals');

router.get('/staticGoals', function (req, res, next) {
res.send(JSON.stringify(
    staticGoals.goal
  ));
});



module.exports = router;
