var express = require('express');
var router = express.Router();
var path = require('path');

var mongoose = require('mongoose');
var Caseworkers = require('../models/caseworkers');

router.get('/', function(req, res, next) {
  res.send('');
});

router.post('/', function(req, res, next) {
  res.send('');
});

router.put('/', function(req, res, next) {
  res.send('');
});

router.delete('/', function(req, res, next) {
  res.send('');
});

module.exports = router;
