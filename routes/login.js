// var express = require('express');
// var router = express.Router();
// var models = require('../models'); 
// var authService = require('../services/auth');



// /* Login user and return JWT as cookie */
// router.post('/', function (req, res, next) {
//     models.users.findOne({
//       where: { Email: req.body.Email}
//     }).then(user => {
//       if (!user) {
//         console.log('User not found')
//         return res.status(401).json({
//           message: "Login Failed"
//         });
//       } else {
//         let passwordMatch = authService.comparePasswords(req.body.Password, user.Password);
//         if (passwordMatch) {
//           let token = authService.signUser(user);
//           res.cookie('jwt', token);
//           res.redirect('/profile');
//         } else {
//           console.log('Wrong password');
//           res.send('Wrong password');
//         }
//       }
//     });
//   });


// module.exports = router;
