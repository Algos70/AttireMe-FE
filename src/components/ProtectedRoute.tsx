import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
}) => {
  const { user, isLoading } = useUser();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>; // You might want to replace this with a proper loading component
  }

  // If authentication is required and user is not logged in
  if (requireAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is logged in and trying to access auth pages (except confirm-email)
  if (user && ['/login', '/register'].includes(location.pathname)) {
    return <Navigate to="/h/home" replace />;
  }

  return <>{children}</>;
}; 