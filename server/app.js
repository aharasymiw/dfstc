var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('express-jwt');
var dotenv = require('dotenv');

var appointments = require('./server/routes/appointments');
var caseworkers = require('./server/routes/caseworkers');
var clients = require('./server/routes/clients');
var routes = require('./server/routes/index');
var jauth = require('./server/routes/jauth');
var oauth = require('./server/routes/oauth');
var catchall = require('./server/routes/catchall');

var app = express();

dotenv.load();

var jwtCheck = jwt({
  secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//How to protect server-side routes
//app.use('/api/path-you-want-to-protect', jwtCheck);
app.use('/api', jwtCheck);

app.use('/api/appointments', appointments);
app.use('/api/caseworkers', caseworkers);
app.use('/api/clients', clients);
app.use('/api/jauth', jauth);
app.use('/api/oauth', oauth);

app.use('/', routes);
app.use('/*', catchall);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
/*if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    .sendFile('error', {
      message: err.message,
      error: err
    });
  });
}*/

// production error handler
// no stacktraces leaked to user
/*app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  .sendFile('error', {
    message: err.message,
    error: {}
  });
});*/

module.exports = app;
