// Backend/routes/studentRoutes.js

const express = require('express');
const router = express.Router();

// Import the controller functions
const {
  addStudent,
  getAllStudents,
  deleteStudent,
  validateStudent
} = require('../controllers/studentController');

// Define the routes for students
router.post('/', addStudent);          // POST /api/students    -> Add a new student
router.get('/', getAllStudents);       // GET /api/students     -> Get all students
router.delete('/:id', deleteStudent);  // DELETE /api/students/:id -> Delete a student
router.post('/validate', validateStudent); // POST /api/students/validate -> Validate student

module.exports = router;
