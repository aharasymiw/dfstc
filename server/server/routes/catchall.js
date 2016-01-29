var express = require('express');
var router = express.Router();

/* handle root angular route redirects */
router.get('/*', function(req, res, next) {
  var url = req.originalUrl;
  if (url.split('.').length > 1) {
    next();
  } else {
    // handles angular urls. i.e. anything without a '.' in the url (so static files aren't handled)
    console.log('Catch all handled url: ' + url);
    res.redirect('/#' + url);
  }
});

console.log('Route * loaded.');

module.exports = router;
