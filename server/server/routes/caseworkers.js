var express = require('express');
var router = express.Router();
var path = require('path');

var mongoose = require('mongoose');
var Caseworker = require('../models/caseworkers');

router.get('/', function(req, res, next) {
  res.send('');
});

router.post('/', function(req, res, next) {
  var caseworkerForm = new Caseworker({
    cwFirstName: req.body[0],
    cwLastName: String[1],
    cwEmail: String[2],
    cwOrg: String[3],
  });
});

router.put('/', function(req, res, next) {
  res.send('');
});

router.delete('/', function(req, res, next) {
  res.send('');
});

module.exports = router;
