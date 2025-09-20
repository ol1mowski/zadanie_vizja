import React from 'react';

interface AuthButtonsProps {
  className?: string;
}

export const AuthButtons: React.FC<AuthButtonsProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <a
        href="/login"
        className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 transform hover:scale-105"
      >
        Zaloguj
      </a>
      <a
        href="/register"
        className="bg-blue-600 hover:bg-blue-700 hover:shadow-lg text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
      >
        Rejestracja
      </a>
    </div>
  );
};
