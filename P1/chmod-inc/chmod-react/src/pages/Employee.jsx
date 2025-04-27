import React, { useState, useEffect } from 'react';
import './Employee.css';

const Employee = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');
  const [error, setError] = useState('');
  const [orders, setOrders] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders();
    } else if (activeTab === 'forms') {
      fetchInquiries();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      setOrders(data);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/forms', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch customer inquiries');
      }

      const data = await response.json();
      setInquiries(data);
    } catch (err) {
      console.error('Error fetching inquiries:', err);
      setError('Failed to fetch customer inquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoginSuccess('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      setLoginSuccess('Logging in...');
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (!data.token) {
          setError('Server error: Invalid authentication response');
          setLoginSuccess('');
          return;
        }

        localStorage.setItem('token', data.token);
        setLoginSuccess('Login successful!');
        setTimeout(() => {
          setIsLoggedIn(true);
        }, 500);
      } else {
        setLoginSuccess('');
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setLoginSuccess('');
      setError('Connection error. Please check if the server is running.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const renderLoginForm = () => (
    <div className="login-form">
      <h2>Employee Login</h2>
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
          />
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );

  const renderContent = () => (
    <div className="employee-page">
      <div className="employee-sidebar">
        <h2>Employee Portal</h2>
        <nav className="employee-nav">
          <button
            className={`nav-button ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`nav-button ${activeTab === 'forms' ? 'active' : ''}`}
            onClick={() => setActiveTab('forms')}
          >
            Customer Inquiries
          </button>
          <button
            className={`nav-button ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
        </nav>
      </div>

      <div className="employee-content">
        {activeTab === 'dashboard' && <div>Dashboard Content</div>}
        {activeTab === 'forms' && (
          <div>
            <h3>Customer Inquiries</h3>
            {loading ? (
              <p>Loading...</p>
            ) : inquiries.length > 0 ? (
              <ul>
                {inquiries.map((inquiry) => (
                  <li key={inquiry._id}>
                    <p><strong>Name:</strong> {inquiry.name}</p>
                    <p><strong>Email:</strong> {inquiry.email}</p>
                    <p><strong>Message:</strong> {inquiry.message}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No customer inquiries found.</p>
            )}
          </div>
        )}
        {activeTab === 'orders' && (
          <div>
            <h3>Orders</h3>
            {loading ? (
              <p>Loading...</p>
            ) : orders.length > 0 ? (
              <ul>
                {orders.map((order) => (
                  <li key={order._id}>
                    <p><strong>Order ID:</strong> {order.orderId}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        )}
      </div>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );

  return <>{isLoggedIn ? renderContent() : renderLoginForm()}</>;
};

export default Employee;