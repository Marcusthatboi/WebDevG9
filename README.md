##ReadMe

/* Collecting workspace information

TechStore - E-Commerce Application
TechStore is a full-stack e-commerce application that offers tech products such as hardware, software, bundles, services, and accessories.

To Run the Program:
npm run install-all
npm run seed
npm run dev
The server will start on port 5000, and the client will run on port 3000.

Features
User Authentication: Register, login, and logout functionality
Product Browsing: View all products with category filtering
Shopping Cart: Add, update, remove items from your cart
Checkout Process: Complete purchases with shipping and payment information
Order Management: View order history and order details
User Profiles: Access account information and order history
Admin Functionality: Product and order management (admin-only routes)
Project Structure
The application follows a client-server architecture:

Backend (Server)
Express.js: REST API server
MongoDB: NoSQL database for storing products, users, carts, and orders
JWT Authentication: Secure authentication using cookies
Role-Based Access Control: Admin and regular user permissions
Frontend (Client)
React: Frontend UI library
React Router: Navigation and routing
Axios: HTTP client for API requests
CSS: Responsive styling for all components
Getting Started
Prerequisites
Node.js (v14+)
MongoDB (local or Atlas connection)

Available Scripts
npm run server: Run the backend server only
npm run client: Run the frontend development server only
npm run dev: Run both server and client concurrently
npm run seed: Seed the database with initial product data
npm start: Start the production server
API Endpoints
Auth
POST /api/auth/register: Register a new user
POST /api/auth/login: Login user
POST /api/auth/logout: Logout user
GET /api/auth/me: Get current user
Products
GET /api/products: Get all products (with optional category filter)
GET /api/products/:id: Get a single product
POST /api/products: Create a product (admin only)
PUT /api/products/:id: Update a product (admin only)
DELETE /api/products/:id: Delete a product (admin only)
Cart
GET /api/cart: Get user's cart
POST /api/cart/add: Add item to cart
PUT /api/cart/update: Update cart item quantity
DELETE /api/cart/item/:productId: Remove item from cart
DELETE /api/cart/clear: Clear cart
Orders
POST /api/orders: Create a new order
GET /api/orders/myorders: Get user's orders
GET /api/orders/:id: Get order by ID
PUT /api/orders/:id/status: Update order status (admin only)
License
This project is open source and available under the MIT License.
