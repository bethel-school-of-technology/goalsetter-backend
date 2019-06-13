var express = require('express');
var router = express.Router();
var models = require('../models'); //<--- Add models
var authService = require('../services/auth');


router.get('/', function(req, res, next) {
  models.users
    .findAll()
    .then(usersFound => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(usersFound));
    });
});

/* CREATE A USER IN THE DATABASE - WORKING*/ 
router.post('/signup', function(req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Email: req.body.Email
      },
      defaults: {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Password: req.body.Password
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

/* Login user and return JWT as cookie */
router.post('/login', function (req, res, next) {
  models.users.findOne({
    where: {
      Email: req.body.Email,
      Password: req.body.Password
    }
  }).then(user => {
    if (!user) {
      console.log('User not found')
      return res.status(401).json({
        message: "Login Failed"
      });
    }
    if (user) {
      let token = authService.signUser(user); // <--- Uses the authService to create jwt token
      res.cookie('jwt', token); // <--- Adds token to response as a cookie
      res.send('Login successful');
    } else {
      console.log('Wrong password');
      res.redirect('/login')
    }
  });
});

router.get('/profile', function (req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          res.send(JSON.stringify(user));
        } else {
          res.status(401);
          res.send('Invalid authentication token');
        }
      });
  } else {
    res.status(401);
    res.send('Must be logged in');
  }
});

  router.get('/logout', function (req, res, next) {
    res.cookie('jwt', "", { expires: new Date(0) });
    res.send('Logged out');
    });

/*VICTORS SUGGESTION FOR SIGNUP*/
//         req.session.currentUser = req.body.Email;
//         console.log('USER HAS SIGNED UP', req.session.currentUser);
//         res.status(200).send('Thanks for Signing Up', created);
//       } else {

//         res.send(`This user with email ${req.session.currentUser} already exists`);
//       }
//     });
// });

/* USER LOGIN */
// router.post('/login', passport.authenticate('local', {
//   failureRedirect: '/users/login'
//   }),
//   function (req, res, next) {
//     res.redirect('profile');
// });

/* GET USER BY PRIMARY KEY */
// router.get('/profile', function (req, res, next) {
//   if (req.user) {
//     models.users
//       .findById(parseInt(req.user.UserId))
//       .then(user => {
//         if (user) {
//           res.status(200).send(user);
//         } else {
//           res.status(404).send('User not found');
//         }
//       });
//   } else {
//     res.redirect('/users/login');
//   }
// });

// router.get('/login', (req, res, next) => {
//   res.send('this is the login GET route');
// })




module.exports = router;

