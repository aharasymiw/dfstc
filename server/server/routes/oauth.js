var express = require('express');
var router = express.Router();
var path = require('path');
//Requiring the client.js file from models
var mongoose = require('mongoose');
var Client = require('../models/clients');

router.get('/', function(req, res, next) {
  res.send('');
});

router.post('/', function(req, res, next) {
  var clientForm = new Client({

  });
  res.send('');
});

router.put('/', function(req, res, next) {
  res.send('');
});

router.delete('/', function(req, res, next) {
  res.send('');
});

module.exports = router;
