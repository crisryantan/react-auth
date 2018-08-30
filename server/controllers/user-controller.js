'use strict';
var jwt = require('jwt-simple');
var User = require('../models/user-model');
var bcrypt = require('bcryptjs');
var moment = require('moment');
var config = require('../config');
var env = process.NODE_ENV || 'development';

/*
 |--------------------------------------------------------------------------
 | Generate JSON Web Token
 |--------------------------------------------------------------------------
 */
function createToken(user) {
  var payload = {
    // exp: moment().add(14, 'days').unix(), no expiration for now
    iat: moment().unix(),
    sub: user._id
  };

  return jwt.encode(payload, config.tokenSecret);
}

module.exports = {
  /**
   * Create  user
   */
  create: function(req, res) {
    User.findOne({ email: req.body.email }, function(err, existingUser) {
      if (existingUser) {
        return res.status(409).send({ message: 'Email is already taken.' });
      }

      var user = new User({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        fullname: req.body.fullname
      });

      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
          user.password = hash;

          user.save(function() {
            var token = createToken(user);
            res.send({ token: token, user: user });
          });
        });
      });
    });
  },

  findAll: function(req, res) {
    console.log(res);
    User.find(
      {
        deleted: false
      },
      function(err, users) {
        if (err) {
          return res.send(err);
        } else {
          return res.send(users);
        }
      }
    );
  },

  /**
   * Find user by Id
   */
  findById: function(req, res) {
    User.findOne({ _id: req.params.id }, 'name username email', function(
      err,
      user
    ) {
      if (err) {
        return res.send(err);
      } else {
        return res.send(user);
      }
    });
  },

  updateById: function(req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, function(
      err,
      user
    ) {
      if (err) {
        return res.send(err);
      }
      res.send({ user: user });
    });
  },

  /**
   * Delete patient by Id
   */
  deleteById: function(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { deleted: true },
      { upsert: true },
      function(err, patient) {
        if (err) {
          return res.send(err);
        }
        res.send({ message: 'Successfully deleted!' });
      }
    );
  },

  /**
   * Authenticate credentials using username and password
   */
  login: function(req, res) {
    User.findOne({ username: req.body.username }, '+password', function(
      err,
      user
    ) {
      if (!user) {
        return res
          .status(401)
          .send({ message: { email: 'Incorrect username' } });
      }
      bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
        if (!isMatch) {
          return res
            .status(401)
            .send({ message: { password: 'Incorrect password' } });
        }

        user = user.toObject();
        delete user.password;

        var token = createToken(user);
        res.send({ token: token, user: user });
      });
    });
  }
};
