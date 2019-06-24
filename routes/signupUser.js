//import passport from 'passport';

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
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
          };
          User.findOne({
            where: {
              email: data.email,
            },
          }).then(user => {
            user
              .update({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                password: data.password,
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