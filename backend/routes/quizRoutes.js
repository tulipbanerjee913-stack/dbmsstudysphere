const express = require('express');
const router = express.Router();
const { getQuizzes, getQuizById, submitQuizAttempt } = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getQuizzes);
router.get('/:id', protect, getQuizById);
router.post('/:id/attempt', protect, submitQuizAttempt);

module.exports = router;
