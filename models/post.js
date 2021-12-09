const mongoose = require("mongoose");
const Post = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  body: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  category: {
    required:false,
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PostDb = mongoose.model("post", Post);
module.exports = PostDb;
