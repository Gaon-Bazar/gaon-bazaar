// Main Homepage - Shows 4 overview cards
// Each card links to a detailed page with more information

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  // 4 main sections with descriptions
  const mainCards = [
    {
      id: 1,
      title: 'Government Schemes',
      description: 'Explore various schemes and support programs available to farmers including PM-KISAN, crop insurance, and more.',
      icon: '📋',
      route: '/schemes',
      color: '#2d7f3e'
    },
    {
      id: 2,
      title: 'Subsidies & Financial Benefits',
      description: 'Learn about financial assistance including seed subsidies, equipment grants, and low-interest agricultural loans.',
      icon: '💰',
      route: '/subsidies',
      color: '#00897b'
    },
    {
      id: 3,
      title: 'Upcoming Events & Training Programs',
      description: 'Stay updated with workshops, training camps, and awareness sessions happening in your region.',
      icon: '📅',
      route: '/events',
      color: '#1976d2'
    },
    {
      id: 4,
      title: 'Official Announcements & Notices',
      description: 'Important government notices, policy updates, and deadline reminders for farmers.',
      icon: '📢',
      route: '/announcements',
      color: '#f57c00'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Government Support for Farmers</h1>
          <p className="hero-subtitle">
            Schemes, subsidies, fair prices & opportunities for agricultural growth
          </p>
          <div className="hero-divider"></div>
        </div>
      </section>

      {/* Main Cards Grid */}
      <section className="main-cards-section">
        <div className="section-container">
          <h2 className="section-title">Agricultural Support Portal</h2>
          <p className="section-subtitle">Browse government schemes, benefits, and updates</p>

          <div className="main-cards-grid">
            {mainCards.map(card => (
              <div key={card.id} className="main-card">
                <div className="main-card-header" style={{ borderTopColor: card.color }}>
                  <div className="main-card-icon">{card.icon}</div>
                </div>
                <div className="main-card-content">
                  <h3 className="main-card-title">{card.title}</h3>
                  <p className="main-card-description">{card.description}</p>
                </div>
                <div className="main-card-footer">
                  <button 
                    className="learn-more-btn"
                    onClick={() => navigate(card.route)}
                    style={{ borderColor: card.color, color: card.color }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = card.color;
                      e.target.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = card.color;
                    }}
                  >
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
