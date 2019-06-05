var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
// router.get('/users', function(req, res, next) {
//   models.user.findAll ({}).then (foundUsers => {
//     const mappedUsers = foundUsers.map (user =>
//       ({
//         UserID: user.user_id,
//         Name: `${user.first_name} ${user.last_name}`
//       }));
//   res.send(JSON.stringify(mappedUsers));
// });
// });

router.get('/', function(req, res, next) {
  connection.query('SELECT * from members', function (error, results, fields) {
   if (error) throw error;
   res.send(JSON.stringify(results));
 });
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});



module.exports = router;
