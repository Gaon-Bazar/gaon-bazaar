// Events Detail Page
// Displays upcoming events and training programs in a grid format
// Shows date, location, and event details

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DetailPages.css';

function EventsDetailPage() {
  const navigate = useNavigate();

  // Mock data for events
  const events = [
    {
      id: 1,
      title: 'Soil Health Workshop',
      date: '28 Dec 2025',
      location: 'State Agricultural Office, Delhi',
      icon: '🌱',
      description: 'Learn about soil testing, nutrient management, and sustainable farming practices.',
      time: '10:00 AM - 1:00 PM',
      speaker: 'Dr. Rajesh Kumar, Soil Scientist'
    },
    {
      id: 2,
      title: 'Mandi Price Awareness Session',
      date: '30 Dec 2025',
      location: 'Virtual (Online)',
      icon: '📊',
      description: 'Real-time market price trends and strategies for selling crops at fair prices.',
      time: '2:00 PM - 4:00 PM',
      speaker: 'Ministry of Agriculture Expert Panel'
    },
    {
      id: 3,
      title: 'Farmer Training Camp',
      date: '02 Jan 2026',
      location: 'District Cooperative Society',
      icon: '👨‍🌾',
      description: 'Modern farming techniques, organic farming, and sustainable agriculture methods.',
      time: '9:00 AM - 5:00 PM',
      speaker: 'Agricultural Extension Officers'
    },
    {
      id: 4,
      title: 'Crop Insurance Registration Drive',
      date: '05 Jan 2026',
      location: 'Gram Panchayat Office',
      icon: '🛡️',
      description: 'Free registration for PMFBY crop insurance scheme with on-spot assistance.',
      time: '10:00 AM - 4:00 PM',
      speaker: 'Insurance Company Representatives'
    },
    {
      id: 5,
      title: 'Horticulture & Floriculture Seminar',
      date: '08 Jan 2026',
      location: 'Agricultural Research Station',
      icon: '🌸',
      description: 'Latest techniques in vegetable and flower cultivation for higher income.',
      time: '11:00 AM - 3:00 PM',
      speaker: 'Horticulture Experts'
    },
    {
      id: 6,
      title: 'Dairy & Livestock Development Program',
      date: '12 Jan 2026',
      location: 'Veterinary Hospital',
      icon: '🐄',
      description: 'Support for dairy farming, animal care, and livestock management practices.',
      time: '9:30 AM - 12:30 PM',
      speaker: 'Veterinary Officers'
    }
  ];

  return (
    <div className="detail-page">
      {/* Events Grid */}
      <section className="detail-content">
        <div className="section-container">
          <div className="detail-cards-grid">
            {events.map(event => (
              <div key={event.id} className="detail-card event-card">
                <div className="event-date-badge">{event.date}</div>
                <div className="detail-card-icon">{event.icon}</div>
                <h3 className="detail-card-title">{event.title}</h3>
                <p className="detail-card-description">{event.description}</p>
                
                <div className="detail-card-info">
                  <div className="info-row">
                    <span className="info-label">📍 Location:</span>
                    <span className="info-value">{event.location}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">🕐 Time:</span>
                    <span className="info-value">{event.time}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">👤 Speaker:</span>
                    <span className="info-value">{event.speaker}</span>
                  </div>
                </div>

                <button className="apply-btn">Register Now →</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default EventsDetailPage;
