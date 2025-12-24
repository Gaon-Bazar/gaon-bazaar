// Schemes Detail Page
// Displays all government schemes in a grid of cards
// Each scheme shows description and Apply button

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DetailPages.css';

function SchemesDetailPage() {
  const navigate = useNavigate();

  // Mock data for government schemes
  const schemes = [
    {
      id: 1,
      title: 'PM-KISAN Income Support',
      description: 'Direct cash transfer of ₹6,000 per year to eligible farmers in three installments.',
      icon: '💰',
      eligibility: 'All landholding farmers',
      benefit: '₹6,000/year'
    },
    {
      id: 2,
      title: 'Pradhan Mantri Fasal Bima Yojana',
      description: 'Crop insurance to protect farmers from crop loss due to natural calamities.',
      icon: '🛡️',
      eligibility: 'All crop farmers',
      benefit: 'Full crop loss coverage'
    },
    {
      id: 3,
      title: 'Fertilizer Subsidy Program',
      description: 'Government subsidized fertilizers at 50% discount for registered farmers.',
      icon: '🌱',
      eligibility: 'Registered farmers',
      benefit: '50% subsidy'
    },
    {
      id: 4,
      title: 'Minimum Support Price (MSP)',
      description: 'Guaranteed minimum prices for crops to ensure fair value for farmers.',
      icon: '📊',
      eligibility: 'All farmers selling through mandis',
      benefit: 'Fair market prices guaranteed'
    },
    {
      id: 5,
      title: 'Pradhan Mantri Kisan Samman Nidhi',
      description: 'Direct income support to marginalized and small farmers.',
      icon: '🏡',
      eligibility: 'Small and marginal farmers',
      benefit: '₹6,000/year'
    },
    {
      id: 6,
      title: 'Agricultural Infrastructure Development Fund',
      description: 'Finance for farm infrastructure development and value addition.',
      icon: '🏗️',
      eligibility: 'Farmers and agri-enterprises',
      benefit: 'Concessional loans'
    }
  ];

  return (
    <div className="detail-page">
      {/* Schemes Grid */}
      <section className="detail-content">
        <div className="section-container">
          <div className="detail-cards-grid">
            {schemes.map(scheme => (
              <div key={scheme.id} className="detail-card">
                <div className="detail-card-icon">{scheme.icon}</div>
                <h3 className="detail-card-title">{scheme.title}</h3>
                <p className="detail-card-description">{scheme.description}</p>
                
                <div className="detail-card-info">
                  <div className="info-row">
                    <span className="info-label">Eligibility:</span>
                    <span className="info-value">{scheme.eligibility}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Benefit:</span>
                    <span className="info-value">{scheme.benefit}</span>
                  </div>
                </div>

                <button className="apply-btn">Apply Now →</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SchemesDetailPage;
