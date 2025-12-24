// Simple role picker landing page (no auth)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RolePicker() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('farmer');

  return (
    <div style={{ padding: 24, textAlign: 'center' }}>
      <h2>🌿 Gaon Bazar</h2>
      <p>Choose your role:</p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 20 }}>
        <button
          onClick={() => setSelected('farmer')}
          className={selected === 'farmer' ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: '12px 24px' }}
        >
          👨‍🌾 Farmer
        </button>
        <button
          onClick={() => setSelected('buyer')}
          className={selected === 'buyer' ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: '12px 24px' }}
        >
          🛒 Buyer
        </button>
      </div>
      <button
        className="btn-primary"
        onClick={() => navigate(`/${selected}`)}
        style={{ marginTop: 20, padding: '12px 48px' }}
      >
        Enter as {selected}
      </button>
    </div>
  );
}
