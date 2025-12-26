// AuthContext for Gaon Bazar
// Provides: currentUser, loading, login, signup, logout, activeRole, setActiveRole
// Persists session via Supabase and localStorage
// activeRole: Controls which navigation items are visible ('farmer' | 'buyer' | null)

import React, { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../supabaseClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null); // { id, email, name, role }
  const [loading, setLoading] = useState(true);
  
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
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        const user = session.user;
        // Fetch profile for name/role
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('name, role')
          .eq('id', user.id)
          .single();

        if (!error && profile) {
          const merged = { id: user.id, email: user.email, name: profile.name, role: profile.role };
          setCurrentUser(merged);
          localStorage.setItem('gb_profile', JSON.stringify(merged));
        } else {
          // Fallback minimal user
          const merged = { id: user.id, email: user.email, name: user.email, role: null };
          setCurrentUser(merged);
          localStorage.setItem('gb_profile', JSON.stringify(merged));
        }
      } else {
        // Try restore from localStorage if session not available yet
        const cached = localStorage.getItem('gb_profile');
        if (cached) setCurrentUser(JSON.parse(cached));
      }

      setLoading(false);
    }

    init();

    // Keep session in sync
    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return;
      if (session?.user) {
        const user = session.user;
        const { data: profile } = await supabase
          .from('profiles')
          .select('name, role')
          .eq('id', user.id)
          .single();
        const merged = { id: user.id, email: user.email, name: profile?.name || user.email, role: profile?.role || null };
        setCurrentUser(merged);
        localStorage.setItem('gb_profile', JSON.stringify(merged));
      } else {
        setCurrentUser(null);
        localStorage.removeItem('gb_profile');
      }
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  // Signup flow (no email confirmation):
  // 1) Create Supabase auth user
  // 2) Ensure user has an active session (if confirmation is disabled, session should be present; otherwise sign in immediately)
  // 3) Insert profile row with name + role
  // 4) Store session info locally and surface role to UI
  async function signup(name, email, password, role) {
    setLoading(true);
    try {
      // 1) Create auth user. We also write name/role to user_metadata as a safety net.
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name, role } },
      });
      if (signUpError) throw signUpError;

      const userId = signUpData.user?.id;
      if (!userId) throw new Error('Signup failed: missing user id');

      // 2) Ensure we have an active session. If email confirmation is OFF, a session is usually returned.
      // To be reliable in hackathon settings, we explicitly sign in right after sign up.
      try {
        await supabase.auth.signInWithPassword({ email, password });
      } catch (e) {
        // Non-fatal: in case session already exists, proceed
        console.warn('[WARN] Post-signup sign-in skipped:', e?.message);
      }

      // 3) Insert profile row. This powers role-based redirects on future logins.
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({ id: userId, name, role });
      // If insert fails (e.g., RLS), continue using metadata fallback so UI still works.
      if (insertError) console.warn('[WARN] profiles insert failed; UI will use user_metadata fallback:', insertError.message);

      // 4) Store profile locally for immediate redirect by caller component
      const profile = { id: userId, email, name, role };
      setCurrentUser(profile);
      localStorage.setItem('gb_profile', JSON.stringify(profile));

      return { ok: true, role };
    } catch (err) {
      // Readable error surfaced to UI
      return { ok: false, error: err?.message || 'Signup failed' };
    } finally {
      setLoading(false);
    }
  }

  // Login flow:
  // 1) Sign in with email+password
  // 2) Read role from profiles table
  // 3) If profile is missing (e.g., RLS during testing), fallback to user_metadata
  // 4) Store locally and return role to route the user
  async function login(email, password) {
    setLoading(true);
    try {
      // 1) sign in
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      // 2) Fetch profile; fallback to user_metadata if table/policies are not ready
      const userId = data.user.id;
      let merged;
      const { data: profile, error: profErr } = await supabase
        .from('profiles')
        .select('name, role')
        .eq('id', userId)
        .single();
      if (!profErr && profile) {
        merged = { id: userId, email: data.user.email, name: profile.name, role: profile.role };
      } else {
        const meta = data.user.user_metadata || {};
        if (!meta.role) console.warn('[WARN] profile missing; using user_metadata fallback');
        merged = { id: userId, email: data.user.email, name: meta.name || data.user.email, role: meta.role || null };
      }
      setCurrentUser(merged);
      localStorage.setItem('gb_profile', JSON.stringify(merged));

      return { ok: true, role: merged.role };
    } catch (err) {
      // Readable error surfaced to UI
      return { ok: false, error: err?.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await supabase.auth.signOut();
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
