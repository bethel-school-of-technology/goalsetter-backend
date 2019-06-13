var express = require('express');
var router = express.Router();
var models = require('../models');
var staticModels = require('../staticModels/planets');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
   });
  


module.exports = router;
