// Simple header with user info and logout
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// Dev-only: lightweight trigger to run auth tests
import { runAuthTests, enableRedirectLoopMonitor, monitorAuthState } from '../utils/AuthTestHelpers';

export default function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Enable monitors in development
  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    enableRedirectLoopMonitor();
    const off = monitorAuthState();
    return () => off();
  }, []);

  return (
    <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div className="header-content">
        <h1>🌿 Gaon Bazar</h1>
        <p className="subtitle">Fair Prices. Trusted Quality.</p>
      </div>
      <div>
        {currentUser ? (
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span>
              {currentUser.name} · {currentUser.role}
            </span>
            <button className="btn-primary" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 12 }}>
            <Link to="/login" className="btn-primary">Login</Link>
            <Link to="/signup" className="btn-primary">Signup</Link>
            {process.env.NODE_ENV === 'development' && (
              <button
                className="btn-primary"
                onClick={() =>
                  runAuthTests({
                    farmerEmail: 'farmer.test@example.com',
                    buyerEmail: 'buyer.test@example.com',
                    password: 'Test1234!',
                  })
                }
                title="Runs basic auth tests and prints results to console"
              >
                Run Auth Tests
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
