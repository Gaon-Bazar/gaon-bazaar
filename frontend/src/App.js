import React from 'react';
import './index.css';
import './App.css';
import Farmer from './components/Farmer';
import Buyer from './components/Buyer';
import Chatbot from './components/Chatbot';
import { Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import DevAuthTest from './pages/DevAuthTest';
import HomePage from './pages/HomePage';
import SchemesDetailPage from './pages/SchemesDetailPage';
import SubsidiesDetailPage from './pages/SubsidiesDetailPage';
import EventsDetailPage from './pages/EventsDetailPage';
import AnnouncementsDetailPage from './pages/AnnouncementsDetailPage';
import BillingPage from './pages/BillingPage';
import { useAuth } from './context/AuthContext';
// Import useTranslation hook for multi-language support
import { useTranslation } from 'react-i18next';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeRole, setActiveRole } = useAuth();
  // Hook to access translation functions and current language
  const { t, i18n } = useTranslation();
  
  // Scroll to top when location changes
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);
  
  // Toggle between English and Hindi
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  // Define all navigation items with role visibility rules
  // role: null = show for everyone, 'farmer' = farmer only, 'buyer' = buyer only
  const allNavItems = [
    { label: t('nav.home'), to: '/', roles: [null, 'farmer', 'buyer'], hideOnPages: [] },
    { label: t('nav.buyer_dashboard'), to: '/buyer', roles: ['buyer'], hideOnPages: ['/'] },
    { label: t('nav.marketplace'), to: '/buyer', roles: [null, 'farmer', 'buyer'], hideOnPages: [] },
    { label: t('nav.market_insights'), to: '/events', roles: [null, 'farmer', 'buyer'], hideOnPages: [] },
    { label: t('nav.schemes_subsidies'), to: '/schemes', roles: [null, 'farmer', 'buyer'], hideOnPages: ['/', '/buyer'] },
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
        <div className="logo" onClick={() => navigate('/')}>🌾 {t('app.title')}</div>

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
          {/* Language Toggle Button - EN | HI */}
          <button 
            className="nav-lang-btn"
            onClick={toggleLanguage}
            title={`Switch to ${i18n.language === 'en' ? 'Hindi' : 'English'}`}
          >
            {i18n.language === 'en' ? '🇮🇳 HI' : '🇬🇧 EN'}
          </button>
          
          {/* Role selection buttons - active only when route matches */}
          <button 
            className={`nav-role-btn ${location.pathname === '/farmer' ? 'active' : 'inactive'}`}
            onClick={() => {
              setActiveRole('farmer');
              navigate('/farmer');
            }}
            title="Enter Farmer Mode - Shows Farmer Dashboard only"
          >
            {t('nav.enter_farmer')}
          </button>
          <button 
            className={`nav-role-btn ${location.pathname === '/buyer' ? 'active' : 'inactive'}`}
            onClick={() => {
              setActiveRole('buyer');
              navigate('/buyer');
            }}
            title="Enter Buyer Mode - Shows Buyer Dashboard only"
          >
            {t('nav.enter_buyer')}
          </button>
        </div>
      </div>
    </header>
  );
}

function App() {
  const { t } = useTranslation();
  
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
            <div className="footer-title">{t('footer.title')}</div>
            <div className="footer-subtext">{t('footer.subtitle')}</div>
          </div>
          <div className="footer-links">
            <NavLink to="/">{t('nav.home')}</NavLink>
            <NavLink to="/buyer">{t('footer.marketplace')}</NavLink>
            <NavLink to="/schemes">Schemes</NavLink>
          </div>
        </div>
      </footer>

      {/* Chatbot for farmer assistance */}
      <Chatbot />
    </div>
  );
}

export default App;
