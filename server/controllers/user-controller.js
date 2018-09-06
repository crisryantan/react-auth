'use strict';
const jwt = require('jsonwebtoken');
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
      .add(1, 'days')
      .unix(),
    sub: user._id
  };

  return jwt.sign(payload, config.tokenSecret);
}

function verifyToken(token) {
  return jwt.verify(token, config.tokenSecret, function(err, decoded) {
    if (err) {
      return 403;
    }
    return 200;
  });
}

function tokenExpired(res) {
  res.status(403).send({
    error: {
      message: 'Token expired.'
    }
  });
}

module.exports = {
  verifyToken: function(req, res) {
    const authenticated = verifyToken(req.body.token);
    if (authenticated === 200) {
      return res.send(200);
    }
    tokenExpired(res);
  },

  create: function(req, res) {
    return User.findOne({ username: req.body.username }, function(
      err,
      existingUser
    ) {
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
    const authenticated = verifyToken(req.header('token'));
    if (authenticated === 200) {
      return User.find(
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
    }
    return tokenExpired(res);
  },

  /**
   * Find user by Id
   */
  findById: function(req, res) {
    const authenticated = verifyToken(req.header('token'));
    if (authenticated === 200) {
      return User.findOne({ _id: req.params.id }, '', function(err, user) {
        if (err) {
          return res.send(err);
        } else {
          return res.send(user);
        }
      });
    }
    return tokenExpired(res);
  },

  updateById: function(req, res) {
    const authenticated = verifyToken(req.header('token'));

    if (authenticated === 403) {
      return tokenExpired(res);
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

    return User.findOneAndUpdate({ _id: req.params.id }, req.body, function(
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
   * Delete user by Id
   */
  deleteById: function(req, res) {
    const authenticated = verifyToken(req.header('token'));
    if (authenticated === 200) {
      return User.findOneAndUpdate(
        { _id: req.params.id },
        { deleted: true },
        { upsert: true },
        function(err) {
          if (err) {
            return res.send(err);
          }
          res.send({ message: 'Successfully deleted!' });
        }
      );
    }

    return tokenExpired(res);
  },

  /**
   * Authenticate credentials using username and password
   */

  login: function(req, res) {
    User.findOne({ username: req.body.username }, '', function(err, user) {
      if (!user) {
        return res.status(401).send({
          error: {
            message: 'Incorrect username'
          }
        });
      }

      bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
        if (!isMatch) {
          return res.status(401).send({
            error: {
              message: 'Incorrect password'
            }
          });
        }

        user = user.toObject();
        delete user.password;

        const token = createToken(user);
        res.send({ token: token, user: user });
      });
    });
  }
};
