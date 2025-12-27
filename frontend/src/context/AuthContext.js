// AuthContext for Gaon Bazar
// Provides: currentUser, loading, login, signup, logout, activeRole, setActiveRole
// Uses localStorage for session persistence
// activeRole: Controls which navigation items are visible ('farmer' | 'buyer' | null)

import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null); // { id, email, name, role }
  const [loading, setLoading] = useState(false);
  
  // Active role for navigation display: 'farmer' | 'buyer' | null
  // Persisted in localStorage for consistency across page refreshes
  const [activeRole, setActiveRoleState] = useState(() => {
    const saved = localStorage.getItem('gb_active_role');
    return saved || null;
  });
  
  // Wrapper to persist activeRole changes to localStorage
  const setActiveRole = (role) => {
    setActiveRoleState(role);
    if (role) {
      localStorage.setItem('gb_active_role', role);
    } else {
      localStorage.removeItem('gb_active_role');
    }
  };

  // Restore session on mount
  useEffect(() => {
    let mounted = true;

    async function init() {
      setLoading(true);
      // Try restore from localStorage
      const cached = localStorage.getItem('gb_profile');
      if (cached) {
        setCurrentUser(JSON.parse(cached));
      }
      setLoading(false);
    }

    init();

    return () => {
      mounted = false;
    };
  }, []);

  // Signup flow:
  // 1) Create user with email+password
  // 2) Store profile locally
  async function signup(name, email, password, role) {
    setLoading(true);
    try {
      // Create local user profile
      const userId = 'user_' + Date.now(); // Generate simple ID
      const profile = { id: userId, email, name, role };
      
      setCurrentUser(profile);
      localStorage.setItem('gb_profile', JSON.stringify(profile));

      return { ok: true, role };
    } catch (err) {
      return { ok: false, error: err?.message || 'Signup failed' };
    } finally {
      setLoading(false);
    }
  }

  // Login flow:
  // 1) Check credentials (basic validation)
  // 2) Store profile locally
  async function login(email, password) {
    setLoading(true);
    try {
      // Basic validation
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Create local user profile (in production, validate against backend)
      const userId = 'user_' + Date.now();
      const merged = { id: userId, email, name: email.split('@')[0], role: null };
      
      setCurrentUser(merged);
      localStorage.setItem('gb_profile', JSON.stringify(merged));

      return { ok: true, role: merged.role };
    } catch (err) {
      return { ok: false, error: err?.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setCurrentUser(null);
    localStorage.removeItem('gb_profile');
  }

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
    activeRole,
    setActiveRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
