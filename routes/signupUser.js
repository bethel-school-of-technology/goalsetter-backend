import passport from 'passport';

var express = require('express');
var router = express.Router();



module.exports = app => {
  router.post('/', (req, res, next) => {
    passport.authenticate('signup', (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
        req.signup(user, err => {
          const data = {
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            Password: req.body.Password,
          };
          User.findOne({
            where: {
              Email: data.Email,
            },
          }).then(user => {
            user
              .update({
                FirstName: data.FirstName,
                LastName: data.LastName,
                Email: data.Email,
                Password: data.Password,
              })
              .then(() => {
                console.log('user created in db');
                res.status(200).send({ message: 'user created' });
              });
          });
        });
      }
    })(req, res, next);
  });
};