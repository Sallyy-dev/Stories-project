require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path")

const connectDB = require("./config/db");
const { globalErrorHandler } = require("./middlewares/errorhandeling");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());

app.use(cors({
  origin: "http://localhost:3001", // بورت الفرونت اند
  credentials: true
}));

// app.use('/uploads', express.static('/uploads/stories'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Routes
const user = require("./routes/user");
const stories = require("./routes/stories")

app.use("/user", user);
app.use("/stories" , stories)


// Global error handler
app.use(globalErrorHandler);

// Connect DB
connectDB();

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
