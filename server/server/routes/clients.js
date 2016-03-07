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

router.post('/', function(req, res, next) {
  clientService.newClient(req.body, function(response) {
    res.status(response.status).send(response.data);
  });
});

router.put('/edit', function(req, res, next) {
  clientService.editClient(req.body, function(response) {
    res.status(response.status).send(response.data);
  });
});

router.delete('/:id', function(req, res, next) {
  clientService.deleteClient(req.params.id, function(response) {
    res.status(response.status).send(response.data);
  });
});

module.exports = router;
