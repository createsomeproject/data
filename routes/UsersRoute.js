const express = require("express");
const Router = express.Router();
const UserDb = require("../models/users");
const bcrypt = require("bcryptjs");
const PostDb = require("../models/post");

// GET A USER
Router.get('/:id', async function (request, response) {
  try {
      const User = await UserDb.findById(request.params.id)
      const {password, ...others} = User._doc
      response.status(200).json(others)
  } catch (error) {
    response.status(500).json({
      message: "No user to display"
    });
  }
})

// EDIT A USER
Router.put("/edit/:id", async (request, response) => {
  if (request.body.userId === request.params.id) {
    if (request.body.password) {
      const salt = await bcrypt.genSalt(10);
      request.body.password = await bcrypt.hash(request.body.password, salt);
    }
    try {

      const updatedUser = await UserDb.findByIdAndUpdate(
        request.params.id,
        {
          $set: request.body,
        },
        {
          new: true,
        }
      );
      response.status(200).json(updatedUser);
    } catch (error) {
      console.log(error)
      response.status(500).json({
        message: "Error",
      });
    }
  } else {
    response.status(401).json({
      message: "You can only update Your account",
    });
  }
});

// DELETE A USER
Router.delete('/delete/:id', async function (request, response) {
  if (request.body.userId === request.params.id) {
    try {
      const User = await UserDb.findById(request.params.id)
      try {
        await PostDb.deleteMany({ username: User.username })
        await UserDb.findByIdAndDelete(request.params.id)
        response.status(200).json({
          message: 'You have successfuly deleted your account'
        })
      } catch (error) {
        console.log(error)
        response.status(500).json({
          message: 'Error'
        })
      }
    } catch (error) {
      console.log(error)
      response.status(404).json({
        message: 'There is no user with such Post'
      })
    }
  }
  else {
    response.status(401).json({
      message: "You can only delete Your account"
    });
  }
})


module.exports = Router;