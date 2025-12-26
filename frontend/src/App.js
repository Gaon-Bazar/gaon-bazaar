import React from 'react';
import './index.css';
import './App.css';
import Farmer from './components/Farmer';
import Buyer from './components/Buyer';
import { Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import DevAuthTest from './pages/DevAuthTest';
import HomePage from './pages/HomePage';
import SchemesDetailPage from './pages/SchemesDetailPage';
import SubsidiesDetailPage from './pages/SubsidiesDetailPage';
import EventsDetailPage from './pages/EventsDetailPage';
import AnnouncementsDetailPage from './pages/AnnouncementsDetailPage';
import BillingPage from './pages/BillingPage';
import { useAuth } from './context/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeRole, setActiveRole } = useAuth();

  // Define all navigation items with role visibility rules
  // role: null = show for everyone, 'farmer' = farmer only, 'buyer' = buyer only
  const allNavItems = [
    { label: 'Home', to: '/', roles: [null, 'farmer', 'buyer'], hideOnPages: [] },
    { label: 'Buyer Dashboard', to: '/buyer', roles: ['buyer'], hideOnPages: ['/'] },
    { label: 'Marketplace', to: '/buyer', roles: [null, 'farmer', 'buyer'], hideOnPages: [] },
    { label: 'Market Insights', to: '/events', roles: [null, 'farmer', 'buyer'], hideOnPages: [] },
    { label: 'Schemes & Subsidies', to: '/schemes', roles: [null, 'farmer', 'buyer'], hideOnPages: ['/', '/buyer'] },
  ];
  
  // Filter navigation items based on active role and current route
  const navItems = allNavItems.filter(item => {
    const matchesRole = item.roles.includes(activeRole);
    const shouldHideOnCurrentPage = item.hideOnPages.includes(location.pathname);
    return matchesRole && !shouldHideOnCurrentPage;
  });

  return (
    <header className="top-nav">
      <div className="nav-inner">
        <div className="logo" onClick={() => navigate('/')}>🌾 Gaon Bazar</div>

        <nav className="nav-links">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          {/* Role selection buttons - active only when route matches */}
          <button 
            className={`nav-role-btn ${location.pathname === '/farmer' ? 'active' : 'inactive'}`}
            onClick={() => {
              setActiveRole('farmer');
              navigate('/farmer');
            }}
            title="Enter Farmer Mode - Shows Farmer Dashboard only"
          >
            👨‍🌾 Enter as Farmer
          </button>
          <button 
            className={`nav-role-btn ${location.pathname === '/buyer' ? 'active' : 'inactive'}`}
            onClick={() => {
              setActiveRole('buyer');
              navigate('/buyer');
            }}
            title="Enter Buyer Mode - Shows Buyer Dashboard only"
          >
            🛒 Enter as Buyer
          </button>
        </div>
      </div>
    </header>
  );
}

function App() {
  return (
    <div className="App">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/schemes" element={<SchemesDetailPage />} />
          <Route path="/subsidies" element={<SubsidiesDetailPage />} />
          <Route path="/events" element={<EventsDetailPage />} />
          <Route path="/announcements" element={<AnnouncementsDetailPage />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="/farmer" element={<Farmer />} />
          <Route path="/buyer" element={<Buyer />} />
          <Route path="/dev-auth-test" element={<DevAuthTest />} />
          <Route path="*" element={<div style={{ padding: 16 }}>Not Found</div>} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div>
            <div className="footer-title">Connecting Farmers & Buyers</div>
            <div className="footer-subtext">Prototype for demonstration</div>
          </div>
          <div className="footer-links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/buyer">Marketplace</NavLink>
            <NavLink to="/schemes">Schemes</NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
