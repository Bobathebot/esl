// Backend/models/Exam.js
const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
  questions: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
      question: String,
      category: String,
    }
  ],
  deadline: { type: Date, required: true },
  duration: { type: Number, required: true },
  link: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  archived: { type: Boolean, default: false }
});

module.exports = mongoose.model("Exam", ExamSchema);
