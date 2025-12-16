import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
// Handel the data
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("accessToken", data.accessToken);
      setUser({ id: data.user.id, userName: data.user.userName, email: data.user.email });

      alert("Login successful");
      navigate("/feed");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8} p={4} boxShadow={3} borderRadius={2}>
        <Typography variant="h5" mb={3} textAlign="center">Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Email" name="email" fullWidth margin="normal" onChange={handleChange} />
          <TextField label="Password" name="password" type="password" fullWidth margin="normal" onChange={handleChange} />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Login</Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
