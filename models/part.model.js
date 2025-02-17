const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
  part_id: { type: String, required: true, unique: true },
  part_info: { type: String, required: true }
});

const Part = mongoose.model('Part', partSchema);

module.exports = Part;