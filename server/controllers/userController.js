const express = require('express');
const router = express.Router();

const User = require('../models/UserModel');

const userController = {};

userController.signup = (req, res, next) => {
  const { username, password } = req.body;

  User.create({ username, password }, (err, user) => {
    if (err) {
      return next({
        log: 'Error occurred with sign up',
        message: { err: err.message },
      });
    }
    res.locals.userId = user.id;
    res.cookie('userId', user.id);
    return next();
  });
};

userController.login = (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username, password }, (err, user) => {
    if (err) {
      return next({ log: 'ERROR with login', message: { err: err.message } });
    }
    if (user === null) {
      return next({
        log: 'ERROR with login',
        message: { err: "User doesn't exist" },
      });
    }
    res.locals.userId = user.id;
    res.cookie('userId', user.id);
    next();
  });
};
module.exports = userController;
