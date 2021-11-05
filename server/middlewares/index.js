const express = require('express');
const bodyValidator = require('./body-validator');
const auth = require('./auth');
const asyncHandler = require('./async-handler');

module.exports = {
  json: express.json,
  asyncHandler,
  bodyValidator,
  auth
};
