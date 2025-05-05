const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const Order = require('../models/order'); // Changed from orderModel to order
const Product = require('../models/productModel'); // Correct path

const router = express.Router();

// Get all orders for current user
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Create new order
router.post('/', protect, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }
    
    // Find the product directly
    const product = await Product.findOne({ productId });
    
    // Check if product exists
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }
    
    // Create a unique order ID
    const orderId = Math.random().toString(36).substring(2, 10).toUpperCase();
    
    // Calculate total
    const totalAmount = product.price * quantity;
    
    // Create order
    const order = new Order({
      user: req.user._id,
      orderId,
      productId,
      quantity,
      totalAmount,
      status: 'pending'
    });
    
    // Save the order
    await order.save();
    
    // Update product stock
    product.stock -= quantity;
    await product.save();
    
    res.status(201).json(order);
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Error placing order' });
  }
});

module.exports = router;