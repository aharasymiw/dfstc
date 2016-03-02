/**
 * Created by Adia on 2/25/16.
 */
var jwt = require('jsonwebtoken');

module.exports = function() {

  return function(req, res, next) {
    console.log('I work!!!!');
    function getToken(req) {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      }
      return null;
    }

    var token = getToken(req);

    if(token === null) {
      res.redirect('/#/home');
    } else {
      jwt.verify(token, 'supersecret', function(err, decoded) {
        console.log(decoded.type); // returns objects in payload
      });
    }

    console.log(req.baseUrl);

    next();
  };

};
