const jwt = require('jsonwebtoken');
const models = require('../models/index');
const bcrypt = require("bcryptjs");
const keys = require('../config/keys');

var authService = {
  signUser: function(user) {
    const token = jwt.sign(
      {
        Email: user.Email,
        UserId: user.UserId
      },
      'secretkey',
      {
        expiresIn: '1h',
        algorithms: 'RS256'
      }
    );
    return token;
  },
  verifyUser: function(token) { 
    // var secret = new Buffer.from('secretkey', 'base64');
    try {
      let decoded = jwt.verify(token, keys.secretOrKey); 
      console.log("======== DECODED TOKEN ===========", decoded);
      return decoded.id; 
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  hashPassword: function(plainTextPassword) {
    let salt = bcrypt.genSaltSync(3);
    let hash = bcrypt.hashSync(plainTextPassword, salt);
    return hash;
  },
  comparePasswords: function (plainTextPassword, hashedPassword) {
    return bcrypt.compareSync(plainTextPassword, hashedPassword)
  }
}

module.exports = authService;