// Schema, dictates how clients are saved into mongo
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var jsonwebtoken = require('jsonwebtoken');
var SALT_WORK_FACTOR = 12;

var jauthSchema = new Schema(
  {
    email: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true},
    type: {type: String, required: true},
    lastLogin: {type: Date, default: Date.now}
  }
);

jauthSchema.pre('save', function(next) {
  var user = this;
  console.log('saving user!');
  // only hash the password if it has been modified (or is new)
  if (user.isModified('password')) {

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) {

        return err;

      } else {

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) {
            return err;
          } else {
            // override the clear-text password with the hashed one
            user.password = hash;
            next();
          }
        });
      }
    });

  } else {
    next();
  }
});

/**
 * Methods
 */
jauthSchema.methods.comparePassword = function (candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
		if (err) return callback(err);
		return callback(null, isMatch);
	});
};

/**
 * Statics
 */

jauthSchema.statics.getAuthenticated = function (user, callback) {
	console.log('getAuthenticated', user);
	this.findOne({email: user.email}, function (err, doc) {
		if (err) {
			console.log(err);
			return callback(err);
		}

		// make sure the user exists
		else if (!doc) {
			console.log('No user found,');
			return callback(new Error('Invalid username or password.', 401), null);
		}
		else {
			// test for a matching password
			doc.comparePassword(user.password, function (err, isMatch) {
				if (err) {
					console.log(err);
					return callback(err);
				}

				// check if the password was a match
				if (isMatch) {
					var user = {
						email: doc.email,
						id: doc.id,
						type: doc.type
					};

					// return the jwt
					var token = jsonwebtoken.sign(user, 'supersecret', {
						expiresIn: 86400 // expires in 24 hours, expressed in seconds
					});
					console.log("You got a token" + " : " + token);
					return callback(null, token, user);
				}
				else {
					return callback(new Error('Invalid username or password.'), null);

				}
			});
		}
	});
};

module.exports = mongoose.model('Jauth', jauthSchema);

/* Cool things you can do with Schemas
{
  username: {type:String, required: true, index: {unique:true}}
  lastlogin: {type: Date, default: Date.now}
}
*/
