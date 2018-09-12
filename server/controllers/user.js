'use strict';
const User = require('../models/user-model');
const bcrypt = require('bcryptjs');

const { createToken, verifyToken } = require('../utils');

const requiredFields = ['username', 'password', 'fullname', 'userType'];
const invalidToken = {
  error: {
    message: 'Invalid Token.'
  }
};

module.exports = {
  verify: (req, res) => {
    const authenticated = verifyToken(req.body.token);
    if (authenticated) {
      return res.send(200);
    }
    res.status(403).send(invalidToken);
  },

  create: (req, res) => {
    return User.findOne(
      { username: req.body.username },
      (err, existingUser) => {
        if (existingUser) {
          return res.status(409).send({
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

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;

            user.save(() => {
              const token = createToken(user);
              res.send({ token: token, user: user });
            });
          });
        });
      }
    );
  },

  findAll: (req, res) => {
    return User.find(
      {
        deleted: false
      },
      (err, users) => {
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
  findById: (req, res) => {
    return User.findOne({ _id: req.params.id }, '', (err, user) => {
      if (err) {
        return res.send(err);
      } else {
        return res.send(user);
      }
    });
  },

  updateById: (req, res) => {
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

    return User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      (err, user) => {
        if (err) {
          return res.send(err);
        }
        res.send({ user: user });
      }
    );
  },

  /**
   * Delete user by Id
   */
  deleteById: (req, res) => {
    return User.findOneAndUpdate(
      { _id: req.params.id },
      { deleted: true },
      { upsert: true },
      err => {
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

  login: (req, res) => {
    User.findOne({ username: req.body.username }, '', (err, user) => {
      if (!user) {
        return res.status(401).send({
          error: {
            message: 'Incorrect username'
          }
        });
      }

      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
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
