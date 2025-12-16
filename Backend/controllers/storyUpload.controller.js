const Story = require('../models/story');
const StoryView = require('../models/storyView');
const User = require('../models/user');

// upload story
const upload = async (req, res) => {
  try {
    if (!req.file){
return res.status(400).json({ message: 'No file uploaded' });
    } 

    const filePath = `/uploads/stories/${req.file.filename}`;

    const story = await Story.create({
      user_id: req.user.id,
      media_url: filePath,
      media_type: req.file.mimetype.startsWith('video') ? 'video' : 'image',
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000) 
    });

    res.status(201).json({ story });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get user stories
const getUserStories = async (req, res) => {
  try {
    const { userId } = req.params;

    const stories = await Story.find({ user_id: userId }).sort({ created_at: 1 });

    res.json({ user_id: userId, stories });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// record viewing
const markView = async (req, res) => {
  try {
    const { storyId } = req.params;

    await StoryView.updateOne(
      { story_id: storyId, user_id: req.user.id },
      { $setOnInsert: { viewed_at: new Date() } },
      { upsert: true }
    );

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const feed = async (req, res) => {
  try {
    const users = await Story.distinct('user_id');

    let feed = [];

    for (let userId of users) {
      const latestStory = await Story.findOne({ user_id: userId }).sort({ created_at: -1 });
      if (!latestStory) continue;

      const seen = await StoryView.findOne({
        story_id: latestStory.id,
        user_id: req.user.id,
      });

      const user = await User.findById(userId).select('userName profile_picture');

      feed.push({
        user_id: userId,
        userName: user?.userName,
        profile_picture: user?.profile_picture,
        has_unseen: !seen,
        latest_story_at: latestStory.created_at,
        latest_story_media_url: latestStory.media_url,
        media_type: latestStory.media_type
      });
    }

    res.json(feed);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = {upload , feed , markView ,getUserStories }



