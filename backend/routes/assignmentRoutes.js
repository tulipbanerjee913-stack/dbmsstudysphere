const express = require('express');
const router = express.Router();
const { getAssignments, getAssignmentById, submitAssignment } = require('../controllers/assignmentController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getAssignments);
router.get('/:id', protect, getAssignmentById);
router.post('/:id/submit', protect, submitAssignment);

module.exports = router;
