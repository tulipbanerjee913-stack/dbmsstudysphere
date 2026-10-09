const express = require('express');
const router = express.Router();
const { getCourses, getCourseById } = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getCourses);
router.get('/:id', protect, getCourseById);

module.exports = router;
