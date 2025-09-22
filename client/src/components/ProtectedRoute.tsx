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
  console.log('ProtectedRoute auth:', auth, 'requiredRole:', requiredRole);

  if (auth.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Ładowanie...</div>
      </div>
    );
  }

  if (!auth.role) {
    console.log('No role, redirecting to /');
    return <Navigate to="/" replace />;
  }

  if (requiredRole && auth.role !== requiredRole) {
    console.log('Role mismatch, redirecting to /');
    return <Navigate to="/" replace />;
  }

  console.log('Access granted');
  return <>{children}</>;
};
