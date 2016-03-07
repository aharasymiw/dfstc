var express = require('express');
var router = express.Router();
var path = require('path');
var mailer = require('../services/emailService');
var mongoose = require('mongoose');
var User = require('../models/jauth');
var easypass = require('easypass');

var success = {
  okay: 200,
  fail: 500
};

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
    email: req.body.cwEmail.toLowerCase(),
    password: password,
    type: type
  });

  user.save(function(err) {
    if (err) {
      res.status(success.fail).send(err.message);
    } else {
      mailer.sendMailCaseworker(req.body.cwEmail, password);
      res.status(success.okay).send('New user created');
    }
  });
});

router.post('/login', function(req, res, next) {
  console.log(req.body);

  User.getAuthenticated(req.body, function(err, token) {

    if(err) {
      res.status(400).send(err.message);
    } else {
      res.status(success.okay).send('New User Saved');
    }
  });
});

/*
router.put('/', function(req, res, next) {
  res.send('');
});
*/

router.delete('/caseworker/:email/:id', function(req, res) {
  User.findOneAndRemove({email: req.params.email}, function(err) {
    if(err) {
      res.status(success.fail).send(err.message);
    }
    res.status(success.okay).send(req.params.id);
  });
});

module.exports = router;
