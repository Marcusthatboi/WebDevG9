import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  const teamMembers = [
    {
      name: "George Hamilton",
      role: "Lead Developer",
      bio: "George specializes in frontend development with React and has a passion for creating intuitive user interfaces.",
      image: "https://via.placeholder.com/300x300?text=George+Hamilton"
    },
    {
      name: "Marcus Guzman",
      role: "Backend Developer",
      bio: "Marcus is our Node.js and Express expert who ensures our server code is efficient and secure.",
      image: "https://via.placeholder.com/300x300?text=Marcus+Guzman"
    },
    {
      name: "Bradon Dahl",
      role: "UX Designer",
      bio: "Bradon focuses on user experience and design, making sure our applications look great and are easy to use.",
      image: "https://via.placeholder.com/300x300?text=Bradon+Dahl"
    }
  ];

  return (
    <div className="about-page">
      <div className="about-header">
        <h1>About TechStore</h1>
        <p>Your one-stop destination for all your tech needs</p>
      </div>

      <div className="about-content">
        <div className="about-story">
          <h2>Our Story</h2>
          <p>
            Founded in 2025, TechStore began with a simple mission: to provide customers with high-quality tech products at competitive prices, accompanied by exceptional service. What started as a small online venture has since grown into a comprehensive e-commerce platform serving customers nationwide.
          </p>
          <p>
            Our passion for technology and commitment to customer satisfaction has been the driving force behind our growth. We carefully curate our product selection, partnering with trusted manufacturers and brands to ensure we offer only the best to our customers.
          </p>
          <p>
            At TechStore, we believe in making technology accessible to everyone. Whether you're a tech enthusiast, professional, or casual user, we have products that cater to your specific needs. Our team is constantly researching and testing new products to stay ahead of the tech curve.
          </p>
        </div>

        <div className="about-values">
          <div className="value-card">
            <div className="value-icon">
              <i className="fas fa-star"></i>
            </div>
            <h3>Quality</h3>
            <p>We never compromise on quality, offering only products that meet our high standards.</p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <i className="fas fa-handshake"></i>
            </div>
            <h3>Integrity</h3>
            <p>Honest and transparent business practices are at the core of everything we do.</p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <i className="fas fa-headset"></i>
            </div>
            <h3>Customer Service</h3>
            <p>Our dedicated support team is always ready to assist you with any questions or concerns.</p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <i className="fas fa-lightbulb"></i>
            </div>
            <h3>Innovation</h3>
            <p>We constantly evolve, embracing new technologies and improving our services.</p>
          </div>
        </div>

        <div className="about-team">
          <h2>Meet Our Team</h2>
          <div className="team-members">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member">
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <h3>{member.name}</h3>
                <span className="member-role">{member.role}</span>
                <p>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;