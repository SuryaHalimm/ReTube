const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  fileVideo: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  uploadAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('videoSchema', videoSchema);
