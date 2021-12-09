const mongoose = require("mongoose");
const Category = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CategoryDb = mongoose.model('category',Category)
module.exports = CategoryDb 