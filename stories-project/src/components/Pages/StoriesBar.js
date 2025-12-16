import React from "react";

function StoriesBar({ feed, onStoryClick }) {
  // if no stories uploaded
  if (!feed || feed.length === 0) return <p>No stories</p>;

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        overflowX: "auto",
        padding: "10px 0",
      }}
    >
      {/* Handel feed when upload story */}
      {feed.map((userStory) => (
        <div
          key={userStory.user_id}
          onClick={() => onStoryClick(userStory)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={`http://localhost:3000${userStory.latest_story_media_url}`}
            alt={userStory.userName}
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              objectFit: "cover",
              border: userStory.has_unseen ? "2px solid red" : "2px solid gray",
            }}
          />
          <p style={{ textAlign: "center", fontSize: 12, marginTop: 4 }}>
            {userStory.userName}
          </p>
        </div>
      ))}
    </div>
  );
}

export default StoriesBar;
