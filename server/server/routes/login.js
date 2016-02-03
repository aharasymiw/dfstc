var express = require('express');
var router = express.Router();
var path = require('path');
//Requiring the client.js file from models
var mongoose = require('mongoose');
var User = require('../models/jauth');

router.post('/', function(req, res, next) {
  console.log(req.body);

  User.getAuthenticated(req.body, function(err, token) {
    if (err) {
      console.log(err.message);
      res.status(400).send(err.message);
    } else {
      console.log(token);
      res.send(token);
    }
  });
});

module.exports = router;
