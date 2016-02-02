var express = require('express');
var router = express.Router();
var path = require('path');
var mailer = require('../services/emailService');
var mongoose = require('mongoose');
var User = require('../models/jauth');
var easypass = require('easypass');

router.get('/', function(req, res, next) {
  res.send('');
});

router.post('/client', function(req, res, next) {
  var type = 'client';
  var user = new User({
    email: req.body.email,
    password: req.body.password,
    type: client
  });

  user.save(function(err) {

    console.log(err);
  });

});

router.post('/caseworker', function(req, res, next) {
  var password = easypass.generate(12);
  var type = 'caseworker';
  var user = new User({
    email: req.body.email,
    password: password,
    type: type
  });

  user.save(function(err) {
    console.log(err);
  });

  mailer.sendMailCaseworker(req.body.email, password);

  res.sendStatus(200);

});

router.post('/login', function(req, res, next) {
  console.log(req.body);

  User.getAuthenticated(req.body, function(err, token) {

    if(err) {
      res.status(400).send(err.message);
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
