const { BadRequest } = require('http-errors');
const Joi = require('joi');

module.exports = function(schema) {
  return function(req, res, next) {
    Joi.validate(req.body, schema, { stripUnknown: true })
      .then(result => {
        req.body = result;
        next();
      })
      .catch(error => {
        next(new BadRequest(error.details[0].message));
      });
  };
};
