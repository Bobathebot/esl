// controllers/authController.js
const User = require('../models/User');

// Register
exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    // Basic example - you'd hash password in production
    const newUser = await User.create({ username, password, role });
    res.status(201).json({ message: 'User registered', user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Compare password (again, ideally hashed)
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
