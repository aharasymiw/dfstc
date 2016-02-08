var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var caseworkerService = require('../services/caseworkerService');

router.get('/', function(req, res, next) {
  caseworkerService.getCaseworkers(function(data) {
    res.send(data);
  });
});

router.post('/', function(req, res, next) {
  req.body.cwEmail = req.body.cwEmail.toLowerCase();

  var response = {
    status: 200,
    data: 'okay'
  };
  response = caseworkerService.newCaseworker(req.body);
  res.status(response.status).send(response.data);
});

router.put('/', function(req, res, next) {
  res.send('');
});

router.delete('/', function(req, res, next) {
  res.send('');
});

module.exports = router;
