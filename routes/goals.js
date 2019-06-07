var express = require('express');
var router = express.Router();
//var mysql = require('mysql2');
var models = require('../models');
var staticGoals = require('../staticGoals/goals');

router.get('/staticGoals', function (req, res, next) {
  res.send(JSON.stringify(
    staticGoals.goals));
});

router.get('/', function (req, res, next) {
    res.send('This Works');
})


module.exports = router;
