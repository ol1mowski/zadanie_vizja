import React from 'react';
import { useUser } from '../../../../contexts/UserContext';
import { UnassignedReservations } from './components/UnassignedReservations.component';
import { MyAssignedReservations } from './components/MyAssignedReservations.component';
import { AdminHeader, AdminStatsCards } from './components';

export const AdminDashboard: React.FC = () => {
  const { logout } = useUser();
  const [currentView, setCurrentView] = React.useState<'dashboard' | 'unassigned' | 'my-reservations'>('dashboard');

  if (currentView === 'unassigned') {
    return (
      <UnassignedReservations onBack={() => setCurrentView('dashboard')} />
    );
  }

  if (currentView === 'my-reservations') {
    return (
      <MyAssignedReservations onBack={() => setCurrentView('dashboard')} />
    );
  }

  return (
    <div>
      <AdminHeader onLogout={logout} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200 hover:shadow-lg transition duration-200 cursor-pointer">
          <div className="flex items-center mb-4">
            <div className="bg-blue-500 p-3 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-blue-900 ml-3">
              Dostępne Rezerwacje
            </h3>
          </div>
          <p className="text-blue-700 text-sm mb-4">
            Przeglądaj wszystkie dostępne rezerwacje do przypisania
          </p>
          <button 
            onClick={() => setCurrentView('unassigned')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Zobacz Rezerwacje
          </button>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200 hover:shadow-lg transition duration-200 cursor-pointer">
          <div className="flex items-center mb-4">
            <div className="bg-green-500 p-3 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-green-900 ml-3">
              Moje Wizyty
            </h3>
          </div>
          <p className="text-green-700 text-sm mb-4">
            Zarządzaj wizytami przypisanymi do Ciebie
          </p>
          <button 
            onClick={() => setCurrentView('my-reservations')}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Zarządzaj Wizytami
          </button>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200 hover:shadow-lg transition duration-200 cursor-pointer">
          <div className="flex items-center mb-4">
            <div className="bg-purple-500 p-3 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-purple-900 ml-3">
              Kalendarz
            </h3>
          </div>
          <p className="text-purple-700 text-sm mb-4">
            Przeglądaj harmonogram wizyt w widoku kalendarza
          </p>
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
            Otwórz Kalendarz
          </button>
        </div>
      </div>

      <AdminStatsCards />
    </div>
  );
};
