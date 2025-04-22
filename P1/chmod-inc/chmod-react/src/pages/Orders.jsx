import React, { useState } from 'react';
import './Orders.css';

const Orders = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between login and register

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // JWT token is stored in localStorage
        setSuccess('Login successful!');
        setIsLoggedIn(true);
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Frontend validation for password length
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Account created successfully! You can now log in.');
        setIsRegistering(false); // Switch back to login form
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="page-container orders-page">
      <div className="container">
        <h1>Orders</h1>
        {!isLoggedIn ? (
          <div className="auth-section">
            {isRegistering ? (
              <>
                <h2>Create an Account</h2>
                <form onSubmit={handleRegister}>
                  <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
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
                  <button type="submit">Register</button>
                </form>
                <p>
                  Already have an account?{' '}
                  <button className="toggle-button" onClick={() => setIsRegistering(false)}>
                    Log in
                  </button>
                </p>
              </>
            ) : (
              <>
                <h2>Login to View Your Orders</h2>
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
                  <button type="submit">Login</button>
                </form>
                <p>
                  Don't have an account?{' '}
                  <button className="toggle-button" onClick={() => setIsRegistering(true)}>
                    Register
                  </button>
                </p>
              </>
            )}
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
          </div>
        ) : (
          <div className="content-section">
            <div className="info-box">
              <h2>Orders Management</h2>
              <p>Welcome! Here you can:</p>
              <ul>
                <li>View your order history</li>
                <li>Track shipments in real-time</li>
                <li>Manage returns and exchanges</li>
                <li>Download invoices and receipts</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
