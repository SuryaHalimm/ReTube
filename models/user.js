const mongoose = require('mongoose');

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
  videos: [{ type: mongoose.Schema.ObjectId, ref: 'videoSchema' }],
});

module.exports = mongoose.model('User', schema);
