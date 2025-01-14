// models/Student.js
const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
  eslId: String,
  partnerId: String,
  firstName: String,
  secondName: String,
  cohort: String,
  // add any other fields you need
});

module.exports = mongoose.model('Student', studentSchema);
