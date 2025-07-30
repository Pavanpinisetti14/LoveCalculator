const express = require('express');
const router = express.Router();
const Flames = require('../models/FlamesModel');

router.post('/', async (req, res) => {
  const { boyName, girlName, result } = req.body;
  if (!boyName || !girlName || !result) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const newEntry = new Flames({ boyName, girlName, result });
    await newEntry.save();
    res.status(201).json({ message: 'Flames data stored', data: newEntry });
  } catch (err) {
    console.error('Error saving flames data:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
