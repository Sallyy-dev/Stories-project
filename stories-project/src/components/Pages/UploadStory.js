import { useState } from "react";
import { Container, Box, Button, Typography, Input } from "@mui/material";
import { useNavigate } from "react-router-dom";

function UploadStory() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate(); //  useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if not file upload
    if (!file) return alert("Select file");

    const formData = new FormData();
    formData.append("file", file);
    // Handel stories upload
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("http://localhost:3000/stories/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Story uploaded");
      navigate("/feed"); // الانتقال تلقائي للـ Feed
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} p={4} boxShadow={3} borderRadius={2}>
        <Typography variant="h5" mb={3} textAlign="center">
          Upload Story
        </Typography>
        <form onSubmit={handleSubmit}>
          <Input
            type="file"
            fullWidth
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Upload
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default UploadStory;
