const express = require('express');
const router = express.Router();
const Timetable = require('../models/Timetable');

// Get all timetable entries
router.get('/', async (req, res) => {
  try {
    const timetables = await Timetable.find().sort({ day: 1, time: 1 });
    res.json(timetables);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create timetable entry
router.post('/', async (req, res) => {
  const timetable = new Timetable({
    day: req.body.day,
    time: req.body.time,
    activity: req.body.activity
  });

  try {
    const newTimetable = await timetable.save();
    res.status(201).json(newTimetable);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete timetable entry
router.delete('/:id', async (req, res) => {
  try {
    await Timetable.findByIdAndDelete(req.params.id);
    res.json({ message: 'Timetable entry deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;