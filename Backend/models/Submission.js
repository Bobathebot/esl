const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  email: { type: String, required: true },
  examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
  answers: [{
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
    answer: String,
    analysis: {
      score: Number,
      feedback: String,
      highlightedAnswer: String,
      grade: String
    }
  }],
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Submission", SubmissionSchema);
