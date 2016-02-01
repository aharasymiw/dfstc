var express = require('express');
var router = express.Router();

var User = require('../models/jauth');

router.post('/login', function(req, res, next) {
  console.log(req.body);

  User.getAuthenticated(req.body, function(err, token) {
    if (err) {
      console.log(err.message);
      res.status(400).send(err.message);
    } else {
      res.send(token);
    }
  });
});

module.exports = router;
