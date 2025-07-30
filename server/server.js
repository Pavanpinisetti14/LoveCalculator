const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Calculator = require('./models/Calculator');

const app = express();


const allowedOrigins = ['https://love-calculator-red.vercel.app'];
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

const MONGO_URI = 'mongodb+srv://Arjun:Pavan1410@cluster.pd7vx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster';

mongoose.connect(MONGO_URI, {
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


app.get('/', (req, res) => {
  res.send('Love Calculator Backend is running ❤️');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
