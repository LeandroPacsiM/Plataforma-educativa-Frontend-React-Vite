import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
};

export const PublicRoute = () => {
  const { user } = useAuth();
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <Outlet />;
};
