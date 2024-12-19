// Backend/models/Question.js
const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  category: { type: String, required: true },
  assignedCount: { type: Number, default: 0 },
  archived: { type: Boolean, default: false }
});

module.exports = mongoose.model("Question", QuestionSchema);
