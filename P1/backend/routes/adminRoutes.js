const express = require('express');
const { protect, restrictTo } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/admin-dashboard', protect, restrictTo('admin'), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the admin dashboard',
  });
});

module.exports = router;