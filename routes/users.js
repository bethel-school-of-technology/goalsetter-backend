var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require('../config/keys');
var models = require('../models'); 
// var authService = require('../services/auth');


// Load input validation
const validateSignupInput = require('../validation/signup');
const validateLoginInput = require('../validation/login');

// Load User model
const Users = require('../models/users');

router.post("/signup", (req, res) => {
// Form validation
const { errors, isValid } = validateSignupInput(req.body);

// Check validation
if (!isValid) {
  return res.status(400).json(errors);
}

models.users.findOrCreate({ Email: req.body.Email }).then(user => {
  if (user) {
    return res.status(400).json({ email: "Email already exists" });
  } else {
    const newUser = {
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Email: req.body.Email,
      Password: req.body.Password
    };
// Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.Password, salt, (err, hash) => {
        if (err) throw err;
        newUser.Password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  }
});
});

router.post("/login", (req, res) => {
  // Form validation
const { errors, isValid } = validateLoginInput(req.body);
// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
const Email = req.body.Email;
  const password = req.body.password;
// Find user by email
  models.users.findOne({ Email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ Emailnotfound: "Email not found" });
    }
// Check password
    bcrypt.compare(Password, user.Password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          FirstName: user.FirstName,
          LastName: user.LastName,
        };
// Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});


// router.get('/', function(req, res, next) {
//   models.users
//     .findAll()
//     .then(usersFound => {
//       res.setHeader('Content-Type', 'application/json');
//       res.send(JSON.stringify(usersFound));
//     });
// });

// /* CREATE A USER IN THE DATABASE - WORKING*/ 
// router.post('/signup', function(req, res, next) {
//   models.users
//     .findOrCreate({
//       where: {
//         Email: req.body.Email
//       },
//       defaults: {
//         FirstName: req.body.FirstName,
//         LastName: req.body.LastName,
//         Password: authService.hashPassword(req.body.Password)
//       }
//     })
//     .spread(function(result, created) {
//       if (created) {
//         res.send('User successfully created');
//         // res.redirect('/login');
//       } else {
//         res.send('This user already exists');
//       }
//     });
// });

// /* Login user and return JWT as cookie */
// router.post('/login', function (req, res, next) {
//   models.users.findOne({
//     where: { Email: req.body.Email}
//   }).then(user => {
//     if (!user) {
//       console.log('User not found')
//       return res.status(401).json({
//         message: "Login Failed"
//       });
//     } else {
//       let passwordMatch = authService.comparePasswords(req.body.Password, user.Password);
//       if (passwordMatch) {
//         let token = authService.signUser(user);
//         return res.status(200).json({
//           token
//         });
//         // res.cookie('jwt', token);
//         //res.setHeaderHere
//         // res.send('You are logged in!');

//       } else {
//         console.log('Wrong password');
//         res.send('Wrong password');
//       }
//     }
//   });
// });

// router.get('/profile', function (req, res, next) {
//   let token = req.cookies.jwt;

//   if(token) {
//     // verify user

//     authService.verifyUser(token)
//     .then(user => {
//       if (user) {
//         res.send(JSON.stringify(user));
//       } else {
//         res.status(401);
//         res.send('Must be logged in');
//       }
//     })

//   } else {
//     // redirect to login 
// res.redirect('/users/login');
//   }
  
  
// });

//   router.get('/logout', function (req, res, next) {
//     res.cookie('jwt', "", { expires: new Date(0) });
//     res.send('Logged out');
//     });

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

