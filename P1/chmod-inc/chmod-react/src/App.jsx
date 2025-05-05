import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Employee from './pages/Employee'; // Import the new Employee component
import './App.css';
import logo from './assets/logo.png';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [products, setProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // scroll effect stuff
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products'); // Call the Express servers api
        const data = await response.json();
        setProducts(data); // Set the fetched products
      } catch (err) {
        console.error('Error fetching products:', err.message);
      }
    };

    fetchProducts();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const response = await fetch('http://localhost:3000/api/auth/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // token could expire 
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchUserData();
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
          <div className="container header-container">
            <div className="logo-container">
              <h1 className="logo">chmod inc</h1>
            </div>
            <nav>
              <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/employee">Employee Portal</Link></li> 
                <li><Link to="/orders" className="cta-button">Orders</Link></li>
                {isAuthenticated && user?.role === 'admin' && (
                  <li><Link to="/employee" className="admin-link">Employee Portal</Link></li>
                )}
              </ul>
            </nav>
          </div>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products products={products} />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/employee" element={<Employee />} />
          </Routes>
        </main>
        <footer className="footer">
          <div className="container footer-content">
            <div className="footer-section">
              <h3>chmod inc</h3>
              <p>Your all-in-one network hardware supplier</p>
            </div>
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/orders">Orders</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Contact</h3>
              <p>Email: email@email.com</p>
              <p>Phone: (555) 555-5555</p>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; {new Date().getFullYear()} chmod inc. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
