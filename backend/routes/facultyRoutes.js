const express = require('express');
const router = express.Router();
const { getFacultyDashboard, getFacultyCourses, gradeSubmission } = require('../controllers/facultyController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.use(protect);
router.use(authorize('FACULTY', 'ADMIN'));

router.get('/dashboard', getFacultyDashboard);
router.get('/courses', getFacultyCourses);
router.post('/submissions/:id/grade', gradeSubmission);

module.exports = router;
