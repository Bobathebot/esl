const Question = require('../models/Question');
const mongoose = require('mongoose');

exports.addQuestion = async (req, res) => {
  try {
    const { question, category } = req.body;
    if (!question || !category) {
      return res.status(400).json({ error: "Question and category are required." });
    }

    const newQuestion = new Question({ question, category });
    await newQuestion.save();
    res.status(201).json({ success: true, question: newQuestion });
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).json({ error: "Failed to add question." });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Failed to fetch questions." });
  }
};

exports.deleteQuestion = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Question ID format." });
  }

  try {
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ error: "Question not found." });
    }

    await Question.findByIdAndDelete(id);
    res.json({ success: true, message: "Question deleted successfully." });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ error: "Failed to delete question." });
  }
};

exports.archiveQuestion = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Question ID format." });
  }

  try {
    const question = await Question.findById(id);
    if (!question) return res.status(404).json({ error: "Question not found." });

    question.archived = !question.archived;
    await question.save();
    res.json({ success: true, question });
  } catch (error) {
    console.error("Error archiving/unarchiving question:", error);
    res.status(500).json({ error: "Failed to update question status." });
  }
};
