const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const models= require('../models');
const keys = require('./keys');
const opts = {};


opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;


module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      
      models.users.findById(jwt_payload.id)
        .then(User => {
          if (User) {
            return done(null, User);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};