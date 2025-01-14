// routes/studentRoutes.js
const express = require('express');
const { getAllStudents, addStudent } = require('../controllers/studentController');
const router = express.Router();

router.get('/', getAllStudents);
router.post('/', addStudent);

module.exports = router;
