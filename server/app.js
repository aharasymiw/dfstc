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
var login = require('./server/routes/login');
var jauth = require('./server/routes/jauth');
var catchall = require('./server/routes/catchall');
var authCheck = require('./server/services/authMiddleware');

var app = express();

dotenv.load();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/*', jwt({secret: 'supersecret'}));

app.use('/api/appointments', authCheck(), appointments);
app.use('/api/caseworkers', authCheck(), caseworkers);
app.use('/api/clients', authCheck(), clients);
app.use('/login', login);
app.use('/api/jauth', jauth);

app.use('/', routes);
app.use('/*', authCheck(), catchall);

/** ---------- MONGOOSE CONNECTION HANDLING ---------- **/
var dbURI = 'mongodb://localhost:27017/dfstc';

mongoose.connect(dbURI);

// When successfully connected
mongoose.connection.on('connected', function() {
  console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error',function(err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose default connection disconnected');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

app.use(function(err, req, res, next) {

  if(err.name === 'UnauthorizedError') {
    res.send(401, 'invalid token...');
  }
});

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
