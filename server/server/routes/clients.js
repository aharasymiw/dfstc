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

router.put('/', function(req, res, next) {
  clientService.editClient(req.body);
  res.send('Client Successfully Updated');
});

router.delete('/:id', function(req, res, next) {
  console.log('req.params.id:', req.params.data);
  clientService.deleteClient(req.params.id);
  res.send('Client Successfully Deleted');
});

module.exports = router;
