// Announcements Detail Page
// Displays official notices and announcements in a notice board style
// Shows importance level, title, description, and date

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DetailPages.css';

function AnnouncementsDetailPage() {
  const navigate = useNavigate();

  // Mock data for announcements
  const announcements = [
    {
      id: 1,
      title: 'NEW: Minimum Support Price (MSP) Updated',
      category: 'Important',
      date: '22 Dec 2025',
      description: 'MSP for Wheat, Rice, and Pulses have been revised for the 2025-26 season. Check government website for latest rates.',
      icon: '📢',
      fullText: 'The Government of India has announced new MSP rates effective immediately. These new rates will ensure fair compensation to farmers.'
    },
    {
      id: 2,
      title: 'PM-KISAN 17th Installment Released',
      category: 'Notice',
      date: '20 Dec 2025',
      description: 'Direct cash transfer of ₹2,000 has been credited to registered beneficiaries. Check your bank account for confirmation.',
      icon: '💳',
      fullText: 'The 17th installment of PM-KISAN scheme has been successfully released to all eligible farmers.'
    },
    {
      id: 3,
      title: 'Extended Deadline: Crop Insurance Registration',
      category: 'Urgent',
      date: '18 Dec 2025',
      description: 'Last date extended to 31 Dec 2025 for PMFBY crop insurance registration. Apply now through your nearest cooperative society.',
      icon: '🛡️',
      fullText: 'Due to overwhelming response, the registration deadline for PMFBY has been extended by 2 weeks.'
    },
    {
      id: 4,
      title: 'New Fertilizer Subsidy Registration Portal Live',
      category: 'Important',
      date: '16 Dec 2025',
      description: 'Online portal for fertilizer subsidy registration is now operational. Register and get subsidized fertilizers.',
      icon: '🌱',
      fullText: 'Farmers can now register for fertilizer subsidy online at the official agriculture ministry website.'
    },
    {
      id: 5,
      title: 'Kharif Crop Insurance Claims Extended',
      category: 'Notice',
      date: '14 Dec 2025',
      description: 'Farmers can now file insurance claims for Kharif 2025 crops. Submit documentation at your nearest office.',
      icon: '📋',
      fullText: 'The claim submission period for Kharif crops has been extended until 31 Jan 2026.'
    },
    {
      id: 6,
      title: 'Agricultural Loan Disbursement Accelerated',
      category: 'Important',
      date: '12 Dec 2025',
      description: 'Banks are now processing agricultural loans faster with zero-collateral options for small farmers.',
      icon: '🏦',
      fullText: 'New government directive allows faster loan processing for registered farmers with reduced documentation.'
    }
  ];

  const getCategoryColor = (category) => {
    switch(category.toLowerCase()) {
      case 'important': return '#1565c0';
      case 'urgent': return '#c62828';
      default: return '#6a1b9a';
    }
  };

  const getCategoryBgColor = (category) => {
    switch(category.toLowerCase()) {
      case 'important': return '#e3f2fd';
      case 'urgent': return '#ffebee';
      default: return '#f3e5f5';
    }
  };

  return (
    <div className="detail-page">
      {/* Announcements Section */}
      <section className="detail-content announcements-content">
        <div className="section-container">
          <div className="announcements-list">
            {announcements.map(announcement => (
              <div key={announcement.id} className="announcement-item">
                <div 
                  className="announcement-category"
                  style={{ 
                    backgroundColor: getCategoryBgColor(announcement.category),
                    color: getCategoryColor(announcement.category)
                  }}
                >
                  {announcement.category}
                </div>
                
                <div className="announcement-content">
                  <div className="announcement-header">
                    <span className="announcement-icon">{announcement.icon}</span>
                    <h3 className="announcement-title">{announcement.title}</h3>
                  </div>
                  
                  <p className="announcement-description">{announcement.description}</p>
                  <p className="announcement-full-text">{announcement.fullText}</p>
                  
                  <div className="announcement-footer">
                    <span className="announcement-date">📅 {announcement.date}</span>
                    <button className="read-more-btn">Read Full Notice →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AnnouncementsDetailPage;
