// submissionController.js
const Submission = require('../models/Submission');
const Student = require('../models/Student');
const Exam = require('../models/Exam');
const { performNlpAnalysis } = require('../nlpanalysis');

exports.getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate('examId')
      .populate('answers.questionId');
    res.json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ error: "Failed to fetch submissions." });
  }
};

exports.createSubmission = async (req, res) => {
  try {
    const { email, examId, answers } = req.body;

    if (!email || !examId || !answers) {
      return res.status(400).json({ error: "Email, exam ID, and answers are required." });
    }

    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ error: "Student not found." });

    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ error: "Exam not found." });

    const existingSubmission = await Submission.findOne({ email, examId });
    if (existingSubmission) {
      return res.status(400).json({ error: "Exam already submitted by this student." });
    }

    const analyzedAnswers = await Promise.all(
      answers.map(async (ans) => {
        const analysis = await performNlpAnalysis(ans.answer);
        return {
          questionId: ans.questionId,
          answer: ans.answer,
          analysis,
        };
      })
    );

    const newSubmission = new Submission({ email, examId, answers: analyzedAnswers });
    await newSubmission.save();

    // Emit notification event
    if (req.io) {
      req.io.emit("newSubmission", {
        examId: newSubmission.examId,
        studentEmail: newSubmission.email,
        studentName: student.name,
        submittedAt: newSubmission.submittedAt
      });
    }

    res.status(201).json({ success: true, submission: newSubmission });
  } catch (error) {
    console.error("Error submitting exam:", error);
    res.status(500).json({ error: "Failed to submit exam." });
  }
};
