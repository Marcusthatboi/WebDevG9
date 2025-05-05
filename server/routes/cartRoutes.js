// server/routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const { 
  getCart, 
  addToCart, 
  updateCartItem, 
  removeFromCart,
  clearCart 
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // All cart routes require authentication

router.get('/', getCart);
router.post('/add', addToCart);
router.put('/update', updateCartItem);
router.delete('/item/:productId', removeFromCart);
router.delete('/clear', clearCart);

module.exports = router;