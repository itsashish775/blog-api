const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  gradeLevel: Number
});

module.exports = mongoose.model('Student', schema);
