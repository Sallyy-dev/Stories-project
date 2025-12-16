const express = require('express');
const router = express.Router();

const {authenticateToken} = require('../middlewares/auth');
const uploadStories = require('../middlewares/uploadStories');

const {
  feed,
  getUserStories,
  markView,
  upload: uploadStory
} = require('../controllers/storyUpload.controller');


router.get('/feed', authenticateToken, feed);
router.get('/:userId', authenticateToken, getUserStories);
router.post('/:storyId/view', authenticateToken, markView);
router.post('/upload', authenticateToken, uploadStories.single('file'), uploadStory);

module.exports = router;
