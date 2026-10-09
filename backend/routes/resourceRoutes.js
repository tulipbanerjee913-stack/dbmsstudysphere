const express = require('express');
const router = express.Router();
const { getResources, toggleBookmark } = require('../controllers/resourceController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getResources);
router.post('/:id/bookmark', protect, toggleBookmark);

module.exports = router;
