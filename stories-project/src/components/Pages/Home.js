import { Container, Typography, Box } from "@mui/material";

function Home() {
  return (
    <Container sx={{ mt: 5 }}>
      <Box textAlign="center">
        <Typography variant="h3">Welcome to Stories App</Typography>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          See the latest stories and share yours!
        </Typography>
      </Box>
    </Container>
  );
};
export default Home;
