/**
 * Created by cwklausing on 2/1/16.
 */
var mongoose = require('mongoose');
var Caseworker = require('../models/caseworkers');

var response = {};
var success = {
  okay: 200,
  fail: 500,
  new: 'New Caseworker Created',
  delted: 'Caseworker Deleted'
};

var caseworkerService = {

  getCaseworkers: function(answer) {
    Caseworker.find({}, function(err, caseworkers) {
      if(err) {
        response.status = success.fail;
        response.data = err.message;
        answer(response);
      }
      response.status = success.okay;
      response.data = caseworkers;
      answer(response);
    }).sort({cwOrg: 1});
  },

  newCaseworker: function(data, answer) {
    //Convert all e-mail address to lower case before saving.
    data.cwEmail = data.cwEmail.toLowerCase();

    Caseworker.create(data, function(err) {
      if(err) {
        response.status = success.fail;
        response.data = err.message;
        answer(response);
      }
      response.status = success.okay;
      response.data = success.new;
      answer(response);
    });
  },

  deleteCaseworker: function(data, answer) {
    //Convert the caseworker 'id' into an _id object for mongoose
    var id = mongoose.Types.ObjectId(data);
    Caseworker.findByIdAndRemove(id, function(err) {
      if(err) {
        response.status = success.fail;
        response.data = err.message;
        answer(response);
      }
      response.status = success.okay;
      response.data = success.deleted;
      answer(response);
    });
  }

};

module.exports = caseworkerService;
