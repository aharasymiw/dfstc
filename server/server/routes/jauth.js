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
    if(err) {
      console.log(err);
      res.status(400).send('Create User Borked');
    } else {
      res.status(200).send('New User Saved');
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
