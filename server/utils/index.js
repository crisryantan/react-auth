const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config.json');

module.exports = {
  createToken(user) {
    const payload = {
      exp: moment()
        .add(1, 'days')
        .unix(),
      sub: user._id
    };

    return jwt.sign(payload, config.tokenSecret);
  },

  verifyToken(token) {
    return jwt.verify(token, config.tokenSecret, err => {
      if (err) {
        return false;
      }
      return true;
    });
  }
};
