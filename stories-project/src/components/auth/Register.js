import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [form, setForm] = useState({ userName: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("Response status:", res.status);
      console.log("Response data:", data);
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      localStorage.setItem("accessToken", data.accessToken);
      setUser({
        id: data.user.id,
        userName: data.user.userName,
        email: data.user.email,
      });

      alert("Register successful");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8} p={4} boxShadow={3} borderRadius={2}>
        <Typography variant="h5" mb={3} textAlign="center">
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="userName"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Register;
