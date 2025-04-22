import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
  return (
    <div className="page-container">
      <section className="hero">
        <div className="container">
          <h2>Welcome to chmod inc</h2>
          <p>Your all-in-one network hardware supplier.</p>
          <Link to="/products" className="cta-button">Browse Products</Link>
        </div>
      </section>
      
    </div>
  );
};

export default Home;