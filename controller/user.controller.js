// controllers/userController.js

const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signUp = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const User = new UserModel({
        name: req.body.name,
        username: req.body.username,
        gmail: req.body.gmail,
        password: hash,
        userFirstSignUp: req.body.userFirstSignUp || new Date().toISOString(),
        category: Array.isArray(req.body.category)
          ? req.body.category
          : [req.body.category], // Ensure it's an array
      });

      return User.save();
    })
    .then((result) => {
      const token = jwt.sign(
        { gmail: result.gmail, userId: result._id },
        process.env.JWT_KEY, // Ensure the JWT key is available in environment variables
        { expiresIn: "1h" }
      );
      res.status(200).json({
        message: "Account Created",
        status: true,
        data: {
          UserSince: result.userFirstSignUp,
          username: result.username,
          name: result.name,
          token: token,
          expiredToken: 3600,
          userId: result._id,
        },
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Failed to create user",
        error: err.message,
      });
    });
};

// Login logic
exports.login = (req, res, next) => {
  UserModel.findOne({ gmail: req.body.gmail })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Invalid Email Address",
          status: false,
        });
      }
      bcrypt.compare(req.body.password, user.password).then((validate) => {
        if (!validate) {
          return res.status(401).json({
            message: "Invalid Email Address or Password",
            status: false,
          });
        }
        const token = jwt.sign(
          { gmail: user.gmail, userId: user._id },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({
          message: "Login Successfully!",
          data: {
            token: token,
            latestLoginDate: new Date(),
            userId: user._id,
            expiredToken: 3600,
          },
          status: true,
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong! Please try again",
        status: false,
      });
    });
};

// Delete account logic
exports.deleteAccount = (req, res, next) => {
  UserModel.findOneAndDelete({ _id: req.params.id })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: "User not found",
          status: false,
        });
      }
      res.status(200).json({
        message: "Successfully deleted account",
        status: true,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "Internal Server Error",
        status: false,
      });
    });
};

// App version
exports.getAppVersion = (req, res, next) => {
  res.status(200).json({
    message: "App Version successfully fetched",
    version: "v1.1.0",
    status: true,
  });
};
