/**
 * Created by cwklausing on 2/1/16.
 */
var mongoose = require('mongoose');
var Caseworker = require('../models/caseworkers');

var caseworkerService = {
  newCaseworker: function(data) {
    var caseworker = new Caseworker(data);
    caseworker.save(function(err) {
      if(err) {
        console.log(err);
      }
    });
  },
  getCaseworkers: function(callback) {
    Caseworker.find({}, function(err, caseworkers) {
      if(err) {
        callback({message: 'No records found'});
      }
      callback(caseworkers);
    });
  }
};

module.exports = caseworkerService;
