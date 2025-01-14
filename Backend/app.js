// app.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Middleware
app.use(cors());             // allow calls from your frontend
app.use(express.json());     // parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

module.exports = app;
