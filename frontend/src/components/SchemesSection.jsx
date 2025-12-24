// Government schemes section with card-based layout
// Displays various agricultural schemes farmers can apply for

import React from 'react';
import '../styles/SchemesSection.css';

function SchemesSection() {
  // Mock data for government schemes
  const schemes = [
    {
      id: 1,
      title: 'PM-KISAN Income Support',
      description: 'Direct cash transfer of ₹6,000 per year to eligible farmers in three installments.',
      icon: '💰',
      buttonText: 'Learn More'
    },
    {
      id: 2,
      title: 'Pradhan Mantri Fasal Bima Yojana',
      description: 'Crop insurance to protect farmers from crop loss due to natural calamities.',
      icon: '🛡️',
      buttonText: 'Learn More'
    },
    {
      id: 3,
      title: 'Fertilizer Subsidy Program',
      description: 'Government subsidized fertilizers at 50% discount for registered farmers.',
      icon: '🌱',
      buttonText: 'Learn More'
    },
    {
      id: 4,
      title: 'Minimum Support Price (MSP)',
      description: 'Guaranteed minimum prices for crops to ensure fair value for farmers.',
      icon: '📊',
      buttonText: 'Learn More'
    }
  ];

  return (
    <section className="schemes-section">
      <div className="section-container">
        <h2 className="section-title">Government Schemes for Farmers</h2>
        <p className="section-subtitle">Explore various schemes and support programs available to you</p>
        
        <div className="schemes-grid">
          {schemes.map(scheme => (
            <div key={scheme.id} className="scheme-card">
              <div className="scheme-icon">{scheme.icon}</div>
              <h3 className="scheme-title">{scheme.title}</h3>
              <p className="scheme-description">{scheme.description}</p>
              <button className="scheme-button">{scheme.buttonText}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SchemesSection;
