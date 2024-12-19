// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000", // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(bodyParser.json());

// Create HTTP server and Socket.io server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Attach io to req for event emissions in controllers
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Handle Socket.io connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Database connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/school_dashboard")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const questionRoutes = require("./routes/questionRoutes");
const examRoutes = require("./routes/examRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const performanceRoutes = require("./routes/performanceRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

app.use("/api", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/submissions", submissionRoutes); // Make sure handlers exist here
app.use("/api/performance", performanceRoutes);
app.use("/api/notifications", notificationRoutes);

// Start the server
const PORT = 5001;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
