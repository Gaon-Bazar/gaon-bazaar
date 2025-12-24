// ProtectedRoute enforces auth and role-based access
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, role }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div style={{ padding: 16 }}>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (role && currentUser.role !== role) {
    return <div style={{ padding: 16 }}>Access Denied</div>;
  }

  return children;
}
