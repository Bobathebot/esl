// Backend/models/Student.js
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Student", StudentSchema);
