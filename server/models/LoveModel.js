const mongoose = require('mongoose');

const FlamesSchema = new mongoose.Schema({
  boyName: { type: String, required: true },
  girlName: { type: String, required: true },
  result: { type: String, required: true },
});

module.exports = mongoose.model('Flames', FlamesSchema);
