const express = require('express');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Protect this route so only logged-in users can access it
router.get('/my-orders', protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Here are your orders',
    user: req.user, // Access the authenticated user
  });
});

module.exports = router;