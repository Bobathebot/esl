const express = require("express");
const router = express.Router();
const {
  createExam,
  getAllExams,
  archiveExam,
  assignQuestion,
  getExamById
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
router.get("/:id", async (req, res, next) => {
  try {
    const exam = await getExamById(req.params.id);
    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }
    res.json({ success: true, exam });
  } catch (error) {
    console.error("Error retrieving exam:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
