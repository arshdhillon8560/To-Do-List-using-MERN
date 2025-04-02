const mongoose = require('mongoose');

const TimetableSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  activity: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Timetable', TimetableSchema);