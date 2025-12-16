const mongoose = require('mongoose');

const storyViewSchema = new mongoose.Schema({
  story_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Story', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  viewed_at: { type: Date, default: Date.now }
});

storyViewSchema.index({ story_id: 1, user_id: 1 }, { unique: true }); 
// to avoid duplicate the user who view story in db

module.exports = mongoose.model('StoryView', storyViewSchema);
