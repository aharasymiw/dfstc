var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var clientService = require('../services/clientService');

router.get('/all', function(req, res, next) {

  clientService.getClients(function(data) {
    res.send(data);
  });

});

router.post('/', function(req, res, next) {
  clientService.newClient(req.body);
  res.sendStatus(200);

});

router.put('/', function(req, res, next) {
  res.send('');
});

router.delete('/', function(req, res, next) {
  res.send('');
});

module.exports = router;
