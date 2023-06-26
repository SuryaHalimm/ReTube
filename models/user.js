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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  videos: {
    type: mongoose.Schema.ObjectId,
    ref: 'Video',
  },
});

module.exports = mongoose.model('User', schema);
