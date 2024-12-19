// Backend/controllers/studentController.js

const mongoose = require('mongoose');
const Student = require('../models/Student');

/**
 * Add a new student to the database.
 * Expected JSON body: { "email": "", "name": "", "studentId": "" }
 */
exports.addStudent = async (req, res) => {
  try {
    const { email, name, studentId } = req.body;

    if (!email || !name || !studentId) {
      return res.status(400).json({ error: "Email, name, and student ID are required." });
    }

    // Check if a student with the same email or studentId already exists
    const existingStudent = await Student.findOne({ $or: [{ email }, { studentId }] });
    if (existingStudent) {
      return res.status(400).json({ error: "A student with this email or student ID already exists." });
    }

    const newStudent = new Student({ email, name, studentId });
    await newStudent.save();

    // If using socket.io for notifications, for example:
    if (req.io) {
      req.io.emit("newStudent", { email, name, studentId });
    }

    res.status(201).json({ success: true, student: newStudent });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ error: "Failed to add student." });
  }
};

/**
 * Get all students from the database.
 */
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Failed to fetch students." });
  }
};

/**
 * Delete a student by ID.
 * Route param: /:id
 */
exports.deleteStudent = async (req, res) => {
  const { id } = req.params;

  // Validate that the ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Student ID format." });
  }

  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ error: "Student not found." });
    }

    await Student.findByIdAndDelete(id);
    res.json({ success: true, message: "Student deleted successfully." });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Failed to delete student." });
  }
};

/**
 * Validate student details for login.
 * Expected JSON body: { "email": "", "studentId": "" }
 */
exports.validateStudent = async (req, res) => {
  const { email, studentId } = req.body;

  if (!email || !studentId) {
    return res.status(400).json({ error: "Email and Student ID are required." });
  }

  try {
    const student = await Student.findOne({ email, studentId });
    if (student) {
      res.json({ success: true, student });
    } else {
      res.status(401).json({ success: false, message: "Invalid student details." });
    }
  } catch (error) {
    console.error("Error validating student:", error);
    res.status(500).json({ error: "Failed to validate student details." });
  }
};
