// Notices and announcements board
// Displays official government announcements and notices for farmers

import React from 'react';
import '../styles/NoticesBoard.css';

function NoticesBoard() {
  // Mock data for announcements
  const notices = [
    {
      id: 1,
      title: 'NEW: Minimum Support Price (MSP) Updated',
      date: '22 Dec 2025',
      category: 'Important',
      content: 'MSP for Wheat, Rice, and Pulses have been revised for the 2025-26 season. Check government website for latest rates.'
    },
    {
      id: 2,
      title: 'PM-KISAN 17th Installment Released',
      date: '20 Dec 2025',
      category: 'Notice',
      content: 'Direct cash transfer of ₹2,000 has been credited to registered beneficiaries. Check your bank account for confirmation.'
    },
    {
      id: 3,
      title: 'Extended Deadline: Crop Insurance Registration',
      date: '18 Dec 2025',
      category: 'Urgent',
      content: 'Last date extended to 31 Dec 2025 for PMFBY crop insurance registration. Apply now through your nearest cooperative society.'
    }
  ];

  const getCategoryColor = (category) => {
    switch(category.toLowerCase()) {
      case 'important': return 'category-important';
      case 'urgent': return 'category-urgent';
      default: return 'category-notice';
    }
  };

  return (
    <section className="notices-section">
      <div className="section-container">
        <h2 className="section-title">Official Announcements & Notices</h2>
        
        <div className="notices-board">
          {notices.map(notice => (
            <div key={notice.id} className="notice-item">
              <div className={`notice-category ${getCategoryColor(notice.category)}`}>
                {notice.category}
              </div>
              <div className="notice-content">
                <h3 className="notice-title">{notice.title}</h3>
                <p className="notice-description">{notice.content}</p>
                <span className="notice-date">📅 {notice.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NoticesBoard;
