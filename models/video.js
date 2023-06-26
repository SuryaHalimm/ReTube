const mongoose = require('mongoose');

const schema = mongoose.Schema({
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
  uploadBy: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  uploadAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Video', schema);
