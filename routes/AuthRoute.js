const express = require("express");
const Router = express.Router();
const UserDb = require("../models/users");
const Bycrypt = require("bcryptjs");


// REGISTER A USER
Router.post("/register", async function (request, response) {
  try {
    const salt = await Bycrypt.genSalt(10);
    const hashed = await Bycrypt.hash(request.body.password, salt);
    const { username, email, password } = request.body;
    const NewUser = await new UserDb({
      username,
      email,
      password: hashed,
    });
    const user = await NewUser.save();
    response.status(200).json({
      message: "User Added Truly",
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Error",
    });
  }
});

// LOGIN A USER
Router.post("/login", async function (request, response) {
  try {
    const user = await UserDb.findOne({
      username: request.body.username,
    });
    if (!user) {
      response.status(400).json({
        message: "Wrong Username",
      });
    } else {
      const validated = await Bycrypt.compare(
        request.body.password,
        user.password
      );
      if (!validated) {
        response.status(400).json({
          message: "Wrong Password",
        });
      } else {
        const {password, ...others} = user._doc
        response.status(200).json(others)
        
      }
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Error",
    });
  }
});

module.exports = Router;
