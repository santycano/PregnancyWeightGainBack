const express = require('express');
const userRouter = express.Router();
const { json, bodyValidator, auth, asyncHandler } = require('../middlewares');
const httpErrors = require('http-errors');

// Models defined in mongoose schema
const { User } = require('../models/user');

userRouter.post('/login', json(), asyncHandler(login));

userRouter.post('/register', json(), asyncHandler(register));

async function register(req, res) {
  const input = req.body;

  // check whether email exist
  if (await User.findOne({ email: input.email })) {
    throw new httpErrors.BadRequest('User already exists');
  }

  const user = await new User(input).save();
  res.toClient(user);
}

async function login(req, res) {
  const input = req.body;

  let user = await User.findOne({ email: input.email });
  if (!user || !(await user.checkPassword(input.password))) {
    throw new httpErrors.BadRequest('Email or password is invalid!');
  }
  const token = user.getAuthToken();
  res.toClient([user, token]);
}

module.exports = userRouter;
