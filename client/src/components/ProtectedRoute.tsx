import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { UserType } from '../types/user';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserType;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { auth } = useUser();

  if (auth.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Ładowanie...</div>
      </div>
    );
  }

  if (!auth.role) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && auth.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
