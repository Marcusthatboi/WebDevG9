const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  productId: { 
    type: String, 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true,
    default: 1
  },
  totalAmount: { 
    type: Number, 
    required: true 
  },
  orderDate: { 
    type: Date, 
    default: Date.now 
  },
  status: { 
    type: String, 
    default: 'Pending' 
  },
});

module.exports = mongoose.model('Order', orderSchema, 'orders');