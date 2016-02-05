var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var caseworkerService = require('../services/caseworkerService');

router.get('/', function(req, res, next) {
  console.log('Check check check');
  caseworkerService.getCaseworkers(function(data) {
    res.send(data);
  });
});

router.post('/', function(req, res, next) {
  console.log('this works', req.body);

  caseworkerService.newCaseworker(req.body);
  res.sendStatus(200);
});

router.put('/', function(req, res, next) {
  res.send('');
});

router.delete('/', function(req, res, next) {
  res.send('');
});

module.exports = router;
