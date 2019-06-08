var express = require('express');
var router = express.Router();
var models = require('../models');
var staticModels = require('../staticModels/planets');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
 });

router.get('/staticPlanets', function (req, res, next) {
  res.send(JSON.stringify(
    staticModels.planet
  ));
});

router.post('/', function(req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Username: req.body.username
      },
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Email: req.body.email,
        Password: req.body.password
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.send('User successfully created');
      } else {
        res.send('This user already exists');
      }
    });
});

router.get('/allusers', function(req, res, next) {
  models.users
    .findAll()
    .then(usersFound => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(usersFound));
    });
});

module.exports = router;


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
