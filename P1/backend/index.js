const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();

// import routes 
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes'); //  customer
const adminRoutes = require('./routes/adminRoutes'); //  admin 
const formRoutes = require('./routes/formRoutes'); // contact form
const productRoutes = require('./routes/productRoutes'); // product routes

const app = express();

// middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173', 'http://localhost:5174'], // default testing ports 
  credentials: true 
}));
app.use(cookieParser());

// mongo connection 
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost/chmod-inc', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// route paths to controllers (syntax for all this stuff is a bit messy but i did what i could)
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/products', productRoutes);

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});