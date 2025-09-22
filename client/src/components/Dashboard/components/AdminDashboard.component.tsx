import React, { useState, useEffect } from 'react';
import { useUser } from '../../../contexts/UserContext';
import { UnassignedReservations } from './AdminDashboard/UnassignedReservations';
import { MyAssignedReservations } from './AdminDashboard/MyAssignedReservations';
import { NotificationBell } from './Notifications/NotificationBell';
import { reservationsApi } from '../../../api/reservations';

type ViewType = 'dashboard' | 'unassigned' | 'my-reservations';

export const AdminDashboard: React.FC = () => {
  const { logout } = useUser();
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [stats, setStats] = useState<{
    unassigned: number;
    myReservations: number;
    today: number;
    completed: number;
  }>({
    unassigned: 0,
    myReservations: 0,
    today: 0,
    completed: 0
  });

  useEffect(() => {
    if (currentView === 'dashboard') {
      loadStats();
    }
  }, [currentView]);

  const loadStats = async () => {
    try {
      const [unassignedData, myData] = await Promise.all([
        reservationsApi.getUnassignedReservations(),
        reservationsApi.getMyAssignedReservations()
      ]);

      const today = new Date().toISOString().split('T')[0];
      const todayReservations = myData.filter(r => r.date === today && r.status === 'ASSIGNED').length;
      const completedReservations = myData.filter(r => r.status === 'COMPLETED').length;

      setStats({
        unassigned: unassignedData.length,
        myReservations: myData.filter(r => r.status === 'ASSIGNED').length,
        today: todayReservations,
        completed: completedReservations
      });
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

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
            onClick={logout}
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Wyloguj
          </button>
        </div>
      </div>

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
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-blue-600">Nowe rezerwacje:</span>
            <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">{stats.unassigned}</span>
          </div>
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
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-green-600">Przypisane wizyty:</span>
            <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs font-medium">{stats.myReservations}</span>
          </div>
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
    
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-lg">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Nowe rezerwacje</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.unassigned}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-lg">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Moje wizyty</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.myReservations}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Dziś</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.today}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <div className="bg-purple-100 p-2 rounded-lg">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Zakończone</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.completed}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
