import React, { useState } from 'react';
import './index.css';
import './App.css';
import Farmer from './components/Farmer';
import Buyer from './components/Buyer';

function App() {
  const [activeTab, setActiveTab] = useState('farmer');

  return (
    <div className="App">
      {/* Header with Agriculture Theme */}
      <header className="header">
        <div className="header-content">
          <h1>🌿 Gaon Bazar</h1>
          <p className="subtitle">Fair Prices. Trusted Quality.</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="nav-tabs">
        <button
          className={`tab-button ${activeTab === 'farmer' ? 'active' : ''}`}
          onClick={() => setActiveTab('farmer')}
        >
          👨‍🌾 Farmer
        </button>
        <button
          className={`tab-button ${activeTab === 'buyer' ? 'active' : ''}`}
          onClick={() => setActiveTab('buyer')}
        >
          🛒 Buyer
        </button>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === 'farmer' && <Farmer />}
        {activeTab === 'buyer' && <Buyer />}
      </main>

      {/* Decorative Footer - Grass Strip */}
      <footer className="footer">
        <div className="grass-strip">🌾 Connecting Farmers & Buyers 🌾</div>
      </footer>

      {/* Floating Decorations */}
      <div className="decoration-left">🌳</div>
      <div className="decoration-right">🍃</div>
    </div>
  );
}

export default App;
