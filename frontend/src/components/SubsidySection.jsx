// Subsidy and benefits section with highlight cards
// Showcases key financial benefits available to farmers

import React from 'react';
import '../styles/SubsidySection.css';

function SubsidySection() {
  // Mock data for subsidies and benefits
  const benefits = [
    {
      id: 1,
      title: 'Seed Subsidy',
      description: 'Up to 50% subsidy on certified seeds',
      icon: '🌾'
    },
    {
      id: 2,
      title: 'Storage & Cold Chain',
      description: 'Assistance for modern storage facilities and cold chain infrastructure',
      icon: '❄️'
    },
    {
      id: 3,
      title: 'Agricultural Loans',
      description: 'Low-interest loans at 4% annual interest with government guarantee',
      icon: '🏦'
    },
    {
      id: 4,
      title: 'Equipment Subsidy',
      description: 'Up to 40% subsidy on agricultural machinery and equipment',
      icon: '⚙️'
    }
  ];

  return (
    <section className="subsidy-section">
      <div className="section-container">
        <h2 className="section-title">Subsidies & Financial Benefits</h2>
        
        <div className="benefits-grid">
          {benefits.map(benefit => (
            <div key={benefit.id} className="benefit-card">
              <div className="benefit-icon">{benefit.icon}</div>
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-description">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SubsidySection;
