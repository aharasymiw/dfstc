var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var clientService = require('../services/clientService');
var client = require('../models/clients');

router.get('/all', function(req, res, next) {
  clientService.getClients(function(data) {
    res.send(data);
  });
});

router.post('/details', function(req, res, err) {
  res.send('');
});

router.post('/', function(req, res, next) {
  clientService.newClient(req.body);
  res.sendStatus(200);

});

router.put('/', function(req, res, next) {
  res.send('');
});

router.delete('/:id', function(req, res, next) {
  console.log('req.params.id:', req.params.id);
  clientService.deleteClient(req.params.id);
  res.send('Client Successfully Deleted');
});

module.exports = router;
