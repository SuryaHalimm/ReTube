const mongoose = require('mongoose');

const schema = mongoose.Schema({
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
  },
  uploadAt: {
    type: Date,
  },
});

module.exports = mongoose.model('Video', schema);
