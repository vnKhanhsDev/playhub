import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { STORAGE_KEYS, UserRole } from '../config/constants';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  const userJson = localStorage.getItem(STORAGE_KEYS.USER);
  
  if (!token || !userJson) {
    // Redirect to login if not logged in
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(userJson);

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to home if user does not have required permissions
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
