var nodemailer = require('nodemailer');
var EmailTemplate = require('email-templates').EmailTemplate;
var schedule = require('node-schedule');
var dotenv = require('dotenv');

dotenv.load();

var defaultTransport = nodemailer.createTransport('Gmail', {
  service: 'Gmail',
  auth: {
    user: process.env.NODE_MAILER_EMAIL,
    pass: process.env.NODE_MAILER_PASS
  }
});

var locals = {
  email: 'dressupmn@gmail.com',
  name: {
    first: 'Mamma',
    last: 'Mia'
  }
};

var mailer = {
  sendMailCaseworker: function(email, password) {
    // Send a single email
    defaultTransport.sendMail({
      from: process.env.NODE_MAILER_EMAIL,
      to: email,
      subject: 'Your account was created!',
      text: 'Your username is: ' + email + ' your password is: ' + password
    }, function(err, responseStatus) {
      if (err) {
        return console.error(err);
      }
      console.log(responseStatus.message);
    });
  }
};

module.exports = mailer;
