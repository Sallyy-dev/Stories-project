// 

import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#1976d2" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo / Title */}
        <Typography 
          variant="h6" 
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Stories App
        </Typography>

        {/* Navigation Buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Always show Feed & Upload if user logged in */}
          {user && (
            <>
              <Button color="inherit" onClick={() => navigate("/feed")}>
                Feed
              </Button>
              <Button color="inherit" onClick={() => navigate("/upload")}>
                Upload Story
              </Button>
            </>
          )}

          {/* Login / Register */}
          {!user && (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate("/register")}>
                Register
              </Button>
            </>
          )}

          {/* Logout */}
          {user && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
