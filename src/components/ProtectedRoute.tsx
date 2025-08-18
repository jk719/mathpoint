import React, { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { Login } from './Login';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return <>{children}</>;
};