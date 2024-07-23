const mongoose = require("mongoose");

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
    select: false, // this hides the password field in the output
  },

  role: {
    type: String,
    enum: ["student", "admin", "visitor"],
    required: true,
  },
});

module.exports = mongoose.model("User", User); // "User" is the name of the collection in MongoDB. "User" should be in plural form.
