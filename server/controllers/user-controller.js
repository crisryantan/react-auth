'use strict';
const jwt = require('jwt-simple');
const User = require('../models/user-model');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const config = require('../config');
const env = process.NODE_ENV || 'development';

const requiredFields = ['username', 'password', 'fullname', 'userType'];

/*
 |--------------------------------------------------------------------------
 | Generate JSON Web Token
 |--------------------------------------------------------------------------
 */
function createToken(user) {
  const payload = {
    exp: moment()
      .add(7, 'days')
      .unix(),
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
    User.findOne({ username: req.body.username }, function(err, existingUser) {
      console.log(existingUser);
      if (existingUser) {
        return res.status(401).send({
          error: {
            message: 'username is already taken.'
          }
        });
      }

      const hasAllFields = requiredFields.every(field => {
        return req.body[field];
      });

      if (!hasAllFields) {
        return res.status(401).send({
          error: {
            message: 'enter all required fields.'
          }
        });
      }

      const user = new User({
        password: req.body.password,
        username: req.body.username,
        fullname: req.body.fullname,
        userType: req.body.userType
      });

      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
          user.password = hash;

          user.save(function() {
            const token = createToken(user);
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
    User.findOne({ _id: req.params.id }, '', function(err, user) {
      if (err) {
        return res.send(err);
      } else {
        return res.send(user);
      }
    });
  },

  updateById: function(req, res) {
    const hasAllFields = requiredFields.every(field => {
      return req.body[field];
    });

    if (!hasAllFields) {
      return res.status(401).send({
        error: {
          message: 'enter all required fields.'
        }
      });
    }

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
          .send({ message: { username: 'Incorrect username' } });
      }
      bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
        if (!isMatch) {
          return res
            .status(401)
            .send({ message: { password: 'Incorrect password' } });
        }

        user = user.toObject();
        delete user.password;

        const token = createToken(user);
        res.send({ token: token, user: user });
      });
    });
  }
};
