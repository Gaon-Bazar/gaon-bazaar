import React from 'react';
import './index.css';
import './App.css';
import Farmer from './components/Farmer';
import Buyer from './components/Buyer';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import DevAuthTest from './pages/DevAuthTest';
import HomePage from './pages/HomePage';
import SchemesDetailPage from './pages/SchemesDetailPage';
import SubsidiesDetailPage from './pages/SubsidiesDetailPage';
import EventsDetailPage from './pages/EventsDetailPage';
import AnnouncementsDetailPage from './pages/AnnouncementsDetailPage';

function HeaderWithNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const isRoleRoute = location.pathname === '/farmer' || location.pathname === '/buyer';
  
  const handleSwitchRole = () => {
    if (location.pathname === '/farmer') {
      navigate('/buyer');
    } else if (location.pathname === '/buyer') {
      navigate('/farmer');
    }
  };
  
  return (
    <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div className="header-content">
        <h1>🌿 Gaon Bazar</h1>
        <p className="subtitle">Fair Prices. Trusted Quality.</p>
      </div>
      <div style={{ paddingRight: 24, display: 'flex', gap: '12px', alignItems: 'center' }}>
        {!isRoleRoute && (
          <>
            <button 
              className="quick-role-btn farmer-btn"
              onClick={() => navigate('/farmer')}
              title="Enter as Farmer"
            >
              👨‍🌾 Farmer
            </button>
            <button 
              className="quick-role-btn buyer-btn"
              onClick={() => navigate('/buyer')}
              title="Enter as Buyer"
            >
              🛒 Buyer
            </button>
          </>
        )}
        {isRoleRoute && (
          <button className="btn-primary" onClick={handleSwitchRole}>
            Switch Role
          </button>
        )}
      </div>
    </header>
  );
}

function App() {
  return (
    <div className="App">
      <HeaderWithNav />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/schemes" element={<SchemesDetailPage />} />
          <Route path="/subsidies" element={<SubsidiesDetailPage />} />
          <Route path="/events" element={<EventsDetailPage />} />
          <Route path="/announcements" element={<AnnouncementsDetailPage />} />
          <Route path="/farmer" element={<Farmer />} />
          <Route path="/buyer" element={<Buyer />} />
          <Route path="/dev-auth-test" element={<DevAuthTest />} />
          <Route path="*" element={<div style={{ padding: 16 }}>Not Found</div>} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="grass-strip">🌾 Connecting Farmers & Buyers 🌾</div>
      </footer>
      <div className="decoration-left">🌳</div>
      <div className="decoration-right">🍃</div>
    </div>
  );
}

export default App;
