const express = require('express');
const router = express.Router();

// Mock notifications
const notificationsData = [
  { _id: "1", message: "New student added: Lilac", read: false, createdAt: new Date() },
  { _id: "2", message: "Exam 2025/02/01 is approaching deadline", read: false, createdAt: new Date() },
  { _id: "3", message: "Student Jake submitted his exam", read: true, createdAt: new Date() }
];

router.get('/', (req, res) => {
  res.json(notificationsData);
});

router.patch('/:id/read', (req, res) => {
  const { id } = req.params;
  const notif = notificationsData.find(n => n._id === id);
  if (!notif) return res.status(404).json({ error: "Notification not found." });
  notif.read = true;
  res.json({ success: true });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = notificationsData.findIndex(n => n._id === id);
  if (index === -1) return res.status(404).json({ error: "Notification not found." });
  notificationsData.splice(index, 1);
  res.json({ success: true });
});

module.exports = router;
