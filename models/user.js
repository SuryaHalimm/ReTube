const mongoose = require('mongoose');

const schema = mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  re_password: {
    type: String,
  },
});

module.exports = mongoose.model('User', schema);
