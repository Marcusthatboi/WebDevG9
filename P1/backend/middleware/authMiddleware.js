const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // syntax for user model is a bit messed up, but it works

const protect = async (req, res, next) => {
  try {
    let token;
    
    // checks for token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        // gets token from header
        token = req.headers.authorization.split(' ')[1];
        
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-default-secret');
        
        // get user from token
        req.user = await User.findById(decoded.userId).select('-password');
        
        next();
      } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Not authorized, token failed' });
      }
    }
    
    if (!token) {
      res.status(401).json({ message: 'Not authorized, no token' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// check user role
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to perform this action'
      });
    }
    next();
  };
};

module.exports = { protect, restrictTo };