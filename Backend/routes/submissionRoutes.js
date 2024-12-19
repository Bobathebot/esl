// submissionRoutes.js
const express = require('express');
const router = express.Router();
const { getAllSubmissions, createSubmission } = require('../controllers/submissionController');

router.get('/', getAllSubmissions);
router.post('/', createSubmission);

module.exports = router;
