// Backend/routes/performanceRoutes.js
const express = require('express');
const router = express.Router();
const { getStudentPerformanceById, getStudentPerformanceByEmail } = require('../controllers/performanceController');

// Get performance by studentId
router.get('/:studentId', getStudentPerformanceById);

// Get performance by student email
router.get('/student/:email', getStudentPerformanceByEmail);

module.exports = router;
