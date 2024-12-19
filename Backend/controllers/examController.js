// Backend/controllers/examController.js

const Exam = require('../models/Exam');
const Question = require('../models/Question');
const mongoose = require('mongoose');

// Generates a unique exam link using the exam's ID
const generateUniqueLink = (examId) => {
  return `http://localhost:3000/student/exam/${examId}`;
};

exports.createExam = async (req, res) => {
  try {
    const { questionIds, deadline, duration } = req.body;

    // Validate input
    if (!questionIds || !Array.isArray(questionIds) || questionIds.length === 0) {
      return res.status(400).json({ error: "At least one question ID is required." });
    }
    if (!deadline) {
      return res.status(400).json({ error: "Deadline is required." });
    }
    if (!duration || typeof duration !== 'number' || duration <= 0) {
      return res.status(400).json({ error: "Duration must be a positive number." });
    }

    // Convert deadline to Date object
    const examDeadline = new Date(deadline);
    if (isNaN(examDeadline.getTime())) {
      return res.status(400).json({ error: "Invalid deadline format." });
    }

    // Fetch questions from DB
    const questions = await Question.find({ _id: { $in: questionIds } });
    if (questions.length !== questionIds.length) {
      return res.status(400).json({ error: "Some questions not found." });
    }

    const examQuestions = questions.map((q) => ({
      id: q._id,
      question: q.question,
      category: q.category,
    }));

    // Create exam
    const newExam = new Exam({
      questions: examQuestions,
      deadline: examDeadline,
      duration,
      link: "placeholder" // will update below
    });

    // Save exam to get its ID, then update the link
    await newExam.save();

    // Generate link using the exam ID
    const link = generateUniqueLink(newExam._id);
    newExam.link = link;
    await newExam.save();

    res.status(201).json({ success: true, exam: newExam });
  } catch (error) {
    console.error("Error creating exam:", error);
    res.status(500).json({ error: "Failed to create exam." });
  }
};

exports.getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate("questions.id");
    res.json(exams);
  } catch (error) {
    console.error("Error fetching exams:", error);
    res.status(500).json({ error: "Failed to fetch exams." });
  }
};

exports.archiveExam = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Exam ID format." });
  }

  try {
    const exam = await Exam.findById(id);
    if (!exam) {
      return res.status(404).json({ error: "Exam not found." });
    }

    exam.archived = true;
    await exam.save();

    res.json({ success: true, message: "Exam archived successfully.", exam });
  } catch (error) {
    console.error("Error archiving exam:", error);
    res.status(500).json({ error: "Failed to archive exam." });
  }
};

exports.assignQuestion = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body; // Student's email

  if (!email) {
    return res.status(400).json({ error: "Student email is required." });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Exam ID format." });
  }

  const Submission = require('../models/Submission');

  try {
    const exam = await Exam.findById(id);
    if (!exam) {
      return res.status(404).json({ error: "Exam not found." });
    }

    // Check if the student has already taken the exam
    const existingSubmission = await Submission.findOne({ email, examId: id });
    if (existingSubmission) {
      return res.status(400).json({ error: "Exam already submitted by this student." });
    }

    // Fetch the least assigned question
    const leastAssignedQuestions = await Question.find().sort({ assignedCount: 1 }).limit(1);
    if (leastAssignedQuestions.length === 0) {
      return res.status(400).json({ error: "No questions available for assignment." });
    }

    const randomQuestion = leastAssignedQuestions[0];
    randomQuestion.assignedCount += 1;
    await randomQuestion.save();

    const assignedQuestion = {
      id: randomQuestion._id,
      question: randomQuestion.question,
      category: randomQuestion.category,
    };

    res.json({ success: true, assignedQuestion });
  } catch (error) {
    console.error("Error assigning question:", error);
    res.status(500).json({ error: "Failed to assign question." });
  }
};

exports.getExamById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Exam ID format." });
  }

  try {
    const exam = await Exam.findById(id).populate("questions.id");
    if (!exam) {
      return res.status(404).json({ error: "Exam not found." });
    }

    res.json({ success: true, exam });
  } catch (error) {
    console.error("Error fetching exam:", error);
    res.status(500).json({ error: "Failed to fetch exam." });
  }
};
