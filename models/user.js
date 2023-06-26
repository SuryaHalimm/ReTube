const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  fileVideo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  uploadAt: {
    type: Date,
    default: Date.now,
  },
});

const schema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  re_password: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  videos: [videoSchema],
});

module.exports = mongoose.model('User', schema);
