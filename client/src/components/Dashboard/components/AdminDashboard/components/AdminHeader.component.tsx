import React from 'react';
import { NotificationBell } from '../../Notifications/NotificationBell';

interface AdminHeaderProps {
  onLogout: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onLogout }) => {
  return (
    <div className="mb-8 flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Panel Administratora
        </h1>
        <p className="text-gray-600">
          Zarządzaj rezerwacjami i przypisuj wizyty do siebie
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <NotificationBell />
        <button 
          onClick={onLogout}
          className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          Wyloguj
        </button>
      </div>
    </div>
  );
};
