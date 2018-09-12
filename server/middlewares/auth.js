const { verifyToken } = require('../utils');

module.exports = {
  authMiddleware(req, res, next) {
    const authenticated =
      verifyToken(req.body.token) || verifyToken(req.header('token'));
    if (authenticated) {
      return next();
    }

    res.status(403).send({
      error: {
        message: 'Invalid Token.'
      }
    });
  }
};
