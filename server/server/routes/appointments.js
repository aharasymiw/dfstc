var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var appointmentService = require('../services/appointmentService');

router.get('/', function(req, res) {
  appointmentService.getAppointment(function(response) {
    res.status(response.status).send(response.data);
  });
});

router.post('/', function(req, res) {
  appointmentService.newAppointment(req.body, function(response) {
    res.status(response.status).send(response.data);
  });
});

router.post('/update', function(req, res) {
  appointmentService.updateAppointment(req.body, function(response) {
    res.status(response.status).send(response.data);
  });
});

router.delete('/:id', function(req, res) {
  appointmentService.deleteAppointment(req.params.id, function(response) {
    res.status(response.status).send(response.data);
  });
});

module.exports = router;
