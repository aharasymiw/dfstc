/**
 * Created by cwklausing on 1/25/16.
 */
var express = require('express');
var router = express.Router();
var path = require('path');

var mongoose = require('mongoose');
var Volunteer = require('../models/volunteers');

router.get('/', function(req, res, next) {
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
