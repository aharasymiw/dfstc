var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var caseworkerService = require('../services/caseworkerService');

router.get('/', function(req, res) {
  caseworkerService.getCaseworkers(function(response) {
    res.status(response.status).send(response.data);
  });
});

router.post('/', function(req, res) {
  caseworkerService.newCaseworker(req.body, function(response) {
    res.status(response.status).send(response.data);
  });
});

/*
router.put('/update', function(req, res) {
  caseworkerService.updateCaseworker(req.body, function(response) {
    res.status(response.status).send(response.data);
  });
});
*/

router.delete('/:id', function(req, res) {
  caseworkerService.deleteCaseworker(req.params.id, function(response) {
    res.status(response.status).send(response.data);
  });
});

module.exports = router;
