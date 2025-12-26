import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';
import CategoriesSlider from '../components/CategoriesSlider';

function HomePage() {
  const navigate = useNavigate();

  const featureCards = [
    {
      title: 'Voice-Based Crop Listing',
      description: 'Farmers can speak in Hindi/Hinglish to list crops easily.',
      icon: '🎤',
    },
    {
      title: 'Fair Price Intelligence',
      description: 'Get AI-powered fair price suggestions based on market data.',
      icon: '💰',
    },
    {
      title: 'Quality Verification',
      description: 'Temperature & humidity-based freshness scoring.',
      icon: '🌡️',
    },
    {
      title: 'Direct Farmer–Buyer Trade',
      description: 'No middlemen. Transparent and fair trading.',
      icon: '🤝',
    },
  ];

  const resourceCards = [
    {
      title: 'Government Schemes',
      description: 'Browse PM-KISAN, crop insurance, MSP, and more.',
      icon: '📜',
      route: '/schemes',
    },
    {
      title: 'Subsidies & Financial Benefits',
      description: 'Seed, fertilizer, storage, and low-interest loans.',
      icon: '🏦',
      route: '/subsidies',
    },
    {
      title: 'Upcoming Events & Training',
      description: 'Workshops, training camps, and digital agri programs.',
      icon: '📅',
      route: '/events',
    },
    {
      title: 'Official Announcements',
      description: 'Government notices, advisories, and seasonal alerts.',
      icon: '📢',
      route: '/announcements',
    },
  ];

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content container">
          <div className="hero-badge">Empowering Indian Farmers</div>
          <h1 className="hero-title">Gaon Bazar</h1>
          <p className="hero-subtitle">Fair prices. Trusted quality. Direct farmer-to-buyer marketplace.</p>
          <p className="hero-description">
            Gaon Bazar connects farmers and buyers directly using voice-based input, fair price intelligence, and quality
            verification — eliminating middlemen and increasing transparency.
          </p>
          <div className="hero-actions">
            <button className="cta-primary" onClick={() => navigate('/farmer')}>
              Start as Farmer
            </button>
            <button className="cta-secondary" onClick={() => navigate('/buyer')}>
              Explore Marketplace
            </button>
          </div>
        </div>
      </section>

      <section className="feature-section container">
        <div className="section-header">
          <div className="eyebrow">Revolutionary Features for Farmers</div>
          <h2>Built for trust, speed, and fairness</h2>
          <p>Inspired by KrishiChain aesthetics, crafted for Gaon Bazar’s farmer-to-buyer mission.</p>
        </div>
        <div className="feature-grid">
          {featureCards.map((card) => (
            <div key={card.title} className="feature-card">
              <div className="feature-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      <CategoriesSlider />

      <section className="resources-section" id="resources">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow">Government Support & Farmer Resources</div>
            <h2>One window for verified benefits</h2>
            <p>Everything farmers need to trust prices, access schemes, and stay informed.</p>
          </div>
          <div className="resource-grid">
            {resourceCards.map((card) => (
              <div key={card.title} className="resource-card">
                <div className="resource-top">
                  <div className="resource-icon">{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
                <button className="resource-btn" onClick={() => navigate(card.route)}>
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
