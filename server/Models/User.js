const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', user);

module.exports = User;
