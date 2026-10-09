const express = require('express');
const router = express.Router();
const { getAdminStats, getAdminStudents, getAdminFaculty } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.use(protect);
router.use(authorize('ADMIN'));

router.get('/stats', getAdminStats);
router.get('/students', getAdminStudents);
router.get('/faculty', getAdminFaculty);

module.exports = router;
