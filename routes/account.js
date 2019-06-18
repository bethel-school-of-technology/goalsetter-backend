var express = require('express');
var router = express.Router();
var models = require('../models'); 
var authService = require('../services/auth');



// router.get('/account', function (req, res, next) {
//     let token = req.cookies.jwt;
//     authService.verifyUser(token)
//       .then(user => {
//         if (user) {
//           res.send(JSON.stringify(user));
//         } else {
//           res.status(401);
//           res.send('Must be logged in');
//         }
//       })
//   });

  module.exports = router;

