var express = require('express');
var router = express.Router();
var models = require('../models');


router.get('/signup', function(req, res, next) {
  res.render('signup');
});



module.exports = router;
