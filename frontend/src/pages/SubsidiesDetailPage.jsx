// Subsidies Detail Page
// Displays all subsidies and financial benefits in a grid format
// Shows eligibility and benefit details for each subsidy type

import React from 'react';
import '../styles/DetailPages.css';

function SubsidiesDetailPage() {

  // Mock data for subsidies and benefits
  const subsidies = [
    {
      id: 1,
      title: 'Seed Subsidy',
      icon: '🌾',
      description: 'High-quality certified seeds at subsidized rates',
      benefit: 'Up to 50% subsidy on certified seeds',
      eligibility: 'All registered farmers',
      maxAmount: '₹5,000 per hectare'
    },
    {
      id: 2,
      title: 'Storage & Cold Chain',
      icon: '❄️',
      description: 'Assistance for modern storage and preservation facilities',
      benefit: 'Assistance for modern storage facilities',
      eligibility: 'Farmers and FPOs',
      maxAmount: 'Up to ₹1 lakh per farmer'
    },
    {
      id: 3,
      title: 'Agricultural Loans',
      icon: '🏦',
      description: 'Low-interest loans with government guarantee',
      benefit: 'Low-interest loans at 4% annual interest',
      eligibility: 'Farmers with land or crops as collateral',
      maxAmount: 'Up to ₹10 lakh'
    },
    {
      id: 4,
      title: 'Equipment Subsidy',
      icon: '⚙️',
      description: 'Subsidy on agricultural machinery and equipment',
      benefit: 'Up to 40% subsidy on farm equipment',
      eligibility: 'Small and marginal farmers',
      maxAmount: 'Up to ₹80,000 per equipment'
    },
    {
      id: 5,
      title: 'Soil Amendment Subsidy',
      icon: '🪨',
      description: 'Assistance for soil testing and amendments',
      benefit: 'Free soil testing and 50% subsidy on amendments',
      eligibility: 'All farmers',
      maxAmount: '₹2,000 per hectare'
    },
    {
      id: 6,
      title: 'Irrigation Infrastructure',
      icon: '💧',
      description: 'Support for drip and sprinkler irrigation systems',
      benefit: 'Up to 50% subsidy on irrigation systems',
      eligibility: 'Farmers in command areas',
      maxAmount: '₹80,000 per hectare'
    }
  ];

  return (
    <div className="detail-page">
      <section className="detail-hero">
        <div className="section-container">
          <div className="hero-chip">Subsidies & Financial Benefits</div>
          <h1>Financial relief, simplified.</h1>
          <p>Seed, fertilizer, storage, equipment, irrigation, and credit support — curated for every farmer profile.</p>
        </div>
      </section>

      <section className="detail-content">
        <div className="section-container">
          <div className="detail-cards-grid">
            {subsidies.map((subsidy) => (
              <div key={subsidy.id} className="detail-card subsidy-card">
                <div className="detail-card-icon">{subsidy.icon}</div>
                <h3 className="detail-card-title">{subsidy.title}</h3>
                <p className="detail-card-description">{subsidy.description}</p>

                <div className="detail-card-info">
                  <div className="info-row">
                    <span className="info-label">Benefit</span>
                    <span className="info-value">{subsidy.benefit}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Eligibility</span>
                    <span className="info-value">{subsidy.eligibility}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Max Amount</span>
                    <span className="info-value">{subsidy.maxAmount}</span>
                  </div>
                </div>

                <button className="apply-btn">Get Details →</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SubsidiesDetailPage;
