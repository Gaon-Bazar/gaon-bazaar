// Hero section with government-style banner
// Displays main title and call-to-action for the portal

import React from 'react';
import '../styles/HeroSection.css';

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Government Support for Farmers</h1>
        <p className="hero-subtitle">
          Schemes, subsidies, fair prices & opportunities for agricultural growth
        </p>
        <div className="hero-divider"></div>
      </div>
    </section>
  );
}

export default HeroSection;
