const mongoose = require('mongoose');

const calculatorSchema = new mongoose.Schema({
  expression: String,
  result: String
}, { timestamps: true });

module.exports = mongoose.model('Calculator', calculatorSchema);
