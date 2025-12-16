function StoryView({ open, onClose, story }) {
  // if not exist story
  if (!open || !story) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          padding: "5px 10px",
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        Close
      </button>

      {story.media_type === "video" ? (
        <video
          controls
          autoPlay
          style={{ maxHeight: "80%", maxWidth: "80%" }}
          src={`http://localhost:3000${story.latest_story_media_url}`}
        />
      ) : (
        <img
          src={`http://localhost:3000${story.latest_story_media_url}`}
          alt="story"
          style={{ maxHeight: "80%", maxWidth: "80%", objectFit: "contain" }}
        />
      )}
    </div>
  );
}

export default StoryView;
