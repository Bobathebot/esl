// Backend/controllers/performanceController.js

const Student = require('../models/Student');
const Submission = require('../models/Submission');
const mongoose = require('mongoose');

// Get performance by studentId
exports.getStudentPerformanceById = async (req, res) => {
  const { studentId } = req.params;
  try {
    const student = await Student.findOne({ studentId });
    if (!student) return res.status(404).json({ error: "Student not found." });

    const submissions = await Submission.find({ email: student.email })
      .populate("examId")
      .populate("answers.questionId")
      .sort({ submittedAt: -1 });

    res.json({ success: true, submissions });
  } catch (error) {
    console.error("Error fetching performance data by ID:", error);
    res.status(500).json({ error: "Failed to fetch performance data." });
  }
};

// Get performance by student email
exports.getStudentPerformanceByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ error: "Student not found." });

    const submissions = await Submission.find({ email })
      .populate("examId")
      .populate("answers.questionId")
      .sort({ submittedAt: -1 });

    res.json({ success: true, submissions });
  } catch (error) {
    console.error("Error fetching performance data by Email:", error);
    res.status(500).json({ error: "Failed to fetch performance data." });
  }
};
