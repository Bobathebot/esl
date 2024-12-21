const express = require("express");
const router = express.Router();
const {
  createExam,
  getAllExams,
  archiveExam,
  assignQuestion,
  getExamById,
} = require("../controllers/examController");

// Create a new exam
router.post("/", createExam);

// Get all exams
router.get("/", getAllExams);

// Archive an exam
router.post("/:id/archive", archiveExam);

// Assign a random question to a student
router.post("/:id/assign-question", assignQuestion);

// Get a specific exam by ID
router.get("/:id", getExamById);

module.exports = router;
