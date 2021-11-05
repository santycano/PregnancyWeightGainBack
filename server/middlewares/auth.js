const { User } = require('../models/user');
const { Unauthorized } = require('http-errors');

module.exports = function() {
  return async function(req, res, next) {
    const token = req.get('x-auth-token');
    if (!token) return next(new Unauthorized('no token'));
    try {
      req.user = await User.findByToken(token);
      if (!req.user) next(new Unauthorized('no user'));
      else next();
    } catch (error) {
      next(new Unauthorized(error));
    }
  };
};
