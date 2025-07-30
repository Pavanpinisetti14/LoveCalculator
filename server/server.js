const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Calculator = require('./models/Calculator');

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = 'mongodb+srv://Arjun:Pavan1410@cluster.pd7vx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'CalculatorApp'
}).then(() => {
  console.log('MongoDB Connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});


app.post('/api/save', async (req, res) => {
  const { expression, result } = req.body;
  try {
    const entry = new Calculator({ expression, result });
    await entry.save();
    res.status(201).json({ message: 'Saved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving data', error: err });
  }
});


app.get('/api/history', async (req, res) => {
  try {
    const history = await Calculator.find().sort({ createdAt: -1 }).limit(10);
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching history', error: err });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
