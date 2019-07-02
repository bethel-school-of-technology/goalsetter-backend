var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require('../config/keys');
var models = require('../models'); 
var authService = require('../services/auth');


// Load input validation
const validateSignupInput = require('../validation/signup');
const validateLoginInput = require('../validation/login');

// Load User model
const User = require('../models/users');


// @route POST api/users/signup
// @desc Register user
// @access Public
router.post("/signup", (req, res) => {
// Form validation
const { errors, isValid } = validateSignupInput(req.body);

// Check validation
if (!isValid) {
  return res.status(400).json(errors);
}
  // Form validation
models.users
    .findOrCreate({
      where: {
        Email: req.body.Email
      },
      defaults: {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Password: authService.hashPassword(req.body.Password) //<--- Change to this code here
      }
    }
    )
    .spread(function (result, created) {
      if (created) {
        res.send('User successfully created');
      } else {
        res.send('This user already exists');
      }
    });
});



/*OPTION 2 of LOGIN */
router.post("/login", (req, res) => {
  // Form validation
const { errors, isValid } = validateLoginInput(req.body);
// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
// Find user by email
  models.users.findOne({ 
    
    where: {
    Email: req.body.Email
  }, })
  .then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
// Check password
    bcrypt.compare(req.body.Password, user.Password).then(isMatch => {
      if (isMatch) {
        
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.Id,
          firstName: user.FirstName,
          lastName: user.LastName,
          email: user.Email,
          goal: user.userId,

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

router.delete("/:id", function (req, res, next) {
  let Id = parseInt(req.params.id);
  models.users
    .destroy({
      where: { Id: Id }
    })
    .then(result => res.send('UserDeleted'))
    // res.status(201)
    // .catch.status(400)
    res.send("There was a problem deleting the actor.  Please make sure you are specifying the correct id.");
});

// router.delete("/deleteuser", function (req, res, next) {
//   models.users
//   .findOne({
//     where: {
//         Id: req.body.userId
//     }
//   })
//     .then(result => res.send('user deleted'))
//     .catch.status(400)
//     res.send("There was a problem deleting the user.  Please make sure you are specifying the correct id.");
// });

module.exports = router;

