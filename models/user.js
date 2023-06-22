const mongoose = require('mongoose');

const schema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  re_password: String
});

module.exports = mongoose.model('User', schema);