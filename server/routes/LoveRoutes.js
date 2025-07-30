const express = require('express');
const router = express.Router();
const Love = require('../models/LoveModel');

router.post('/', async (req, res) => {
  const { boyName, girlName, result } = req.body;

  if (!boyName || !girlName || !result) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newEntry = new Love({ boyName, girlName, result });
    await newEntry.save();
    res.status(201).json({ message: 'Data saved successfully!' });
  } catch (err) {
    console.error('Error saving to DB:', err);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

module.exports = router;
