/**
 * Created by Adia on 2/25/16.
 */

module.exports = function() {

  return function(req, res, next) {
    console.log('I work!!!!');
    next();
  };

};
