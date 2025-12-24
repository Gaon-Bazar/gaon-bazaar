// Events and training section
// Lists upcoming government-supported events and workshops for farmers

import React from 'react';
import '../styles/EventsSection.css';

function EventsSection() {
  // Mock data for upcoming events
  const events = [
    {
      id: 1,
      title: 'Soil Health Workshop',
      date: '28 Dec 2025',
      location: 'State Agricultural Office, Delhi',
      description: 'Learn about soil testing and nutrient management'
    },
    {
      id: 2,
      title: 'Mandi Price Awareness Session',
      date: '30 Dec 2025',
      location: 'Virtual (Online)',
      description: 'Real-time market price trends and trading information'
    },
    {
      id: 3,
      title: 'Farmer Training Camp',
      date: '02 Jan 2026',
      location: 'District Cooperative Society',
      description: 'Modern farming techniques and sustainable agriculture methods'
    },
    {
      id: 4,
      title: 'Crop Insurance Registration Drive',
      date: '05 Jan 2026',
      location: 'Gram Panchayat Office',
      description: 'Free registration for PMFBY crop insurance scheme'
    }
  ];

  return (
    <section className="events-section">
      <div className="section-container">
        <h2 className="section-title">Upcoming Events & Training Programs</h2>
        
        <div className="events-list">
          {events.map(event => (
            <div key={event.id} className="event-item">
              <div className="event-date">
                <span className="date-label">{event.date}</span>
              </div>
              <div className="event-details">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-location">
                  <span className="location-icon">📍</span>
                  {event.location}
                </p>
                <p className="event-description">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EventsSection;
