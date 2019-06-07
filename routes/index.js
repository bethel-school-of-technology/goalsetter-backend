var express = require('express');
var router = express.Router();
//var mysql = require('mysql2');
var models = require('../models');

var staticGoals = require('../staticGoals/goals');

router.get('/staticGoals', function (req, res, next) {
  res.send(JSON.stringify(
    staticGoals.goal));
});

// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Password1!',
//   database: 'goalsetter'
// });



//  connection.connect(function(err) {
//    if (err) {
//      console.error(err.message);
//     return;
//    }
//    console.log('Yay! You are connected to the database!');
//  })

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
//  });

// router.post('/', function(req, res, next) {
//   models.users
//     .findOrCreate({
//       where: {
//         Username: req.body.username
//       },
//       defaults: {
//         FirstName: req.body.firstName,
//         LastName: req.body.lastName,
//         Email: req.body.email,
//         Password: req.body.password
//       }
//     })
//     .spread(function(result, created) {
//       if (created) {
//         res.send('User successfully created');
//       } else {
//         res.send('This user already exists');
//       }
//     });
// });

module.exports = router;
