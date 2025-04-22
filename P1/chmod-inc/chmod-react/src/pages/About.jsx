import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="page-container about-page">
      <div className="container">
        <h1>About Us</h1>
        <p className="subtitle">Learn more about chmod inc</p>
        
        <div className="wip-container">
          <div className="wip-message">
            <h2>Work in Progress</h2>
            <p>Our About Us page is currently being updated. We're adding more information about our company history, mission, and team. Check back soon to learn more about chmod inc.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;