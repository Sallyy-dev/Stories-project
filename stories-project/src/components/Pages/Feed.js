import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Container, Typography } from "@mui/material";
import StoriesBar from "./StoriesBar";
import StoryView from "./StoryView";

function Feed() {
  const { user } = useContext(AuthContext);
  const [feed, setFeed] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [openStory, setOpenStory] = useState(false);

  // Fetch API to access the feed controller
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch("http://localhost:3000/stories/feed", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Data Response from api
        const data = await res.json();
        if (Array.isArray(data)) {
          setFeed(data);
        } else {
          setFeed([]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchFeed();
  }, []);

//Handel Click on story
  const handleStoryClick = (userStory) => {
    setSelectedStory(userStory);
    setOpenStory(true);
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4" mb={2}>
        Stories Feed
      </Typography>
      <StoriesBar feed={feed} onStoryClick={handleStoryClick} />
      <StoryView
        open={openStory}
        onClose={() => setOpenStory(false)}
        story={selectedStory}
      />
    </Container>
  );
}

export default Feed;
