'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    select: false,
    required: true
  },
  fullname: String,
  userType: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  deleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('User', userSchema);
