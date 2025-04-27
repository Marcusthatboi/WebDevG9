import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Orders.css';
import './Login.css';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [orderMessage, setOrderMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchData('orders', setOrders);
      fetchData('products', setProducts);
    }
  }, []);

  const fetchData = async (endpoint, setState) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setState(data);
      } else if (response.status === 401) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      } else {
        setError(`Failed to fetch ${endpoint}.`);
      }
    } catch (err) {
      setError(`An error occurred while fetching ${endpoint}.`);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login attempt with:", email); // Debug log
    setError('');
    setLoginSuccess('');

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      // show a temporary message to indicate a login attempt
      setLoginSuccess('Logging in...');
      
      console.log("Sending request to:", 'http://localhost:3000/api/auth/login');
      
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Response status:", response.status);
      
      // try to change the response to JSON language 
      let data;
      try {
        data = await response.json();
        console.log("Response data:", data);
      } catch (jsonError) {
        console.error("Error parsing JSON response:", jsonError);
        data = { message: 'Invalid server response' };
      }

      if (response.ok) {
        // Check if token exists in the response
        if (!data.token) {
          console.error("No token in successful response");
          setError('Server error: Invalid authentication response');
          setLoginSuccess('');
          return;
        }

        // Save the jwt token in localstorage
        localStorage.setItem('token', data.token);
        console.log("Token saved successfully");
        
        setLoginSuccess('Login successful!');
        
        // Update login state and fetch data after a short delay
        setTimeout(() => {
          setIsLoggedIn(true);
          fetchData('orders', setOrders);
          fetchData('products', setProducts);
        }, 500); 
        //error status codes
        setLoginSuccess('');
        if (response.status === 401) {
          setError('Invalid email or password');
        } else if (response.status === 404) {
          setError('Login service not found. Is the server running?');
        } else {
          setError(data.message || `Login failed (${response.status})`);
        }
      }
    } catch (err) {
      console.error("Login error:", err); // Debug log
      setLoginSuccess('');
      setError('Connection error. Please check if the server is running.');
    }
  };

  const handlePlaceOrder = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          quantity: 1
        }),
      });

      if (response.ok) {
        setOrderMessage('Order placed successfully!');
        setTimeout(() => setOrderMessage(''), 3000);
        // Refresh the orders list after placing an order
        fetchData('orders', setOrders);
        fetchData('products', setProducts); // Refresh products
      } else if (response.status === 401) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to place order.');
      }
    } catch (err) {
      setError('An error occurred while placing your order.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setOrders([]);
    setProducts([]);
  };

  // Render login form - update this function -b
  const renderLoginForm = () => {
    return (
      <div className="login-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        {loginSuccess && <p className="success-message">{loginSuccess}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button 
            type="submit" 
            className="login-btn"
            disabled={!email || !password} // Disable if empty
          >
            Login
          </button>
        </form>
        <p style={{marginTop: '15px', fontSize: '0.9em'}}>
          Try with test user: user@example.com / password123
        </p>
      </div>
    );
  };

  return (
    <div className="page-container orders-page">
      <div className="container">
        <h1>Orders</h1>
        {!isLoggedIn ? (
          renderLoginForm()
        ) : (
          <div className="content-section">
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
            {error && <div className="error-message">{error}</div>}
            {orderMessage && <div className="success-message">{orderMessage}</div>}
            
            <div className="info-box">
              <h2>Available Products</h2>
              <p>Select a product to place an order.</p>
            </div>

            {products.length > 0 ? (
              <div className="products-list">
                <table className="products-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Specs</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.productId}>
                        <td>{product.name}</td>
                        <td>${product.price.toFixed(2)}</td>
                        <td>{product.stock}</td>
                        <td>
                          {product.specs
                            ? Object.entries(product.specs)
                                .map(([key, value]) => `${key}: ${value}`)
                                .join(', ')
                            : 'N/A'}
                        </td>
                        <td>
                          <button
                            className="place-order-btn"
                            disabled={product.stock <= 0}
                            onClick={() => handlePlaceOrder(product.productId)}
                          >
                            {product.stock > 0 ? 'Place Order' : 'Out of Stock'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No products available.</p>
            )}

            <div className="orders-list">
              <h3>Your Orders</h3>
              {orders.length > 0 ? (
                <ul>
                  {orders.map((order) => (
                    <li key={order._id || order.id}>
                      <p>Order #{order.orderId}</p>
                      <p>Status: {order.status}</p>
                      <p>Total: ${order.totalAmount.toFixed(2)}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>You don't have any orders yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
