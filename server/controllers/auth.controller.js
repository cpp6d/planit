var Trip = require('../db').Trip;
var Users = require('../db').Users;
var activityController = require('./activity.controller');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs')

var authController = {};

/* *
 * Ask Jongsoo and Oliver
 * */
authController.GET = function(req, res) {
  res.status(200).send(authController.hash);
};

/* *
* Get the correct possible and saved activities when a user directly navigates
* to the trip view by using the shareable link.
* */
authController.GETHASH = function(req, res) {
  Trip.findOne({
    where: {
      uuid: req.params.hash
    }
  })
  .then(function(trip) {
    activityController.POST(trip.dataValues.locationName);
    res.redirect('/#/trip/?uuid=' + req.params.hash);
  })
  .catch(function(err) {
    res.status(404).send(err);
  });
};

authController.SIGNUP = function (req, res) {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      res.err(err)
    } else {
      req.body.password = hash

      Users.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
      .then(function(user) {
        var token = jwt.sign({ email: req.body.email, expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) }, 'this is the secret token!');

        res.status(200).header('Auth', token).header('currentUser', user.id).send({ token:token, user: user.id, name: user.name  })
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
    }
  })
};

authController.SIGNIN = function (req, res) {
  Users.findOne({
    "email": req.body.email
  })
  .then(function (user) {
    bcrypt.compare(req.body.password, user.password, (err, response) => {
      if (err) {
        res.status(500).send(err)
      } else if (response !== null) {
        var token = jwt.sign({ email: req.body.email, expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) }, 'this is the secret token!');

        res.status(200).header('Auth', token).header('currentUser', user.id).send({ token:token, user: user.id, name: user.name  })
      } else {
        res.status(400).send('Invalid email or password')
      }
    })
  })
}

module.exports = authController;
