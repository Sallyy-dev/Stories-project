const mongoose = require("mongoose");

const storySchema = mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  media_url: { type: String, required: true },
  media_type: { type: String, enum: ['image','video'], default: 'image' },
  created_at: { type: Date, default: Date.now },
  duration_sec: { type: Number, default: 3 }, 
  expires_at: { type: Date } 
    
});

storySchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Story" , storySchema);