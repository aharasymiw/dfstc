var express = require('express');
var router = express.Router();
var path = require('path');
//Requiring the client.js file from models
var mongoose = require('mongoose');
var User = require('../models/jauth');

router.get('/', function(req, res, next) {
  res.send('');
});

router.post('/', function(req, res, next) {

  console.log(req.body);
  var user = new User({
    email: req.body.email,
    password: req.body.password,
    type: req.body.type
  });
  user.save(function(err) {
    console.log(err);
  });

});

router.post('/login', function(req, res, next) {
  console.log(req.body);

  User.getAuthenticated(req.body, function(err, token) {
    if (err) {
      console.log(err.message);
      res.status(400).send(err.message);
    } else {
      res.send(token);
    }
  });

});

router.put('/', function(req, res, next) {
  res.send('');
});

router.delete('/', function(req, res, next) {
  res.send('');
});

module.exports = router;
