const express = require('express');
const router = express.Router();
const { addQuestion, getAllQuestions, deleteQuestion, archiveQuestion } = require('../controllers/questionController');

router.post('/', addQuestion);
router.get('/', getAllQuestions);
router.delete('/:id', deleteQuestion);
router.patch('/:id/archive', archiveQuestion);

module.exports = router;
