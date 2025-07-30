const mongoose = require('mongoose');

const flamesSchema = new mongoose.Schema({
  expression: String,
  result: String
}, { timestamps: true });

module.exports = mongoose.models.Flames || mongoose.model('Flames', flamesSchema);
