import './App.css';
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Feed from "./components/Pages/Feed";
import UploadStory from "./components/Pages/UploadStory";
import Navbar from "./components/bars/Navbar";
import Home from "./components/Pages/Home";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/upload" element={<UploadStory />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
