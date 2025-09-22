import { useState } from 'react';
import { useUser } from '../../../../contexts/UserContext.tsx';
import { CreateReservationForm } from './components/CreateReservationForm.component.tsx';
import { ReservationsList } from './components/ReservationsList.component.tsx';
import { StudentQuickActions } from './components/StudentQuickActions.component.tsx';


type ViewType = 'dashboard' | 'create' | 'reservations';

export const StudentDashboard: React.FC = () => {
  const { logout } = useUser();
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  const handleCreateSuccess = () => {
    setCurrentView('dashboard');
  };

  if (currentView === 'create') {
    return (
      <CreateReservationForm
        onSuccess={handleCreateSuccess}
        onCancel={() => setCurrentView('dashboard')}
      />
    );
  }

  if (currentView === 'reservations') {
    return (
      <ReservationsList onBack={() => setCurrentView('dashboard')} />
    );
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Panel Studenta
          </h1>
          <p className="text-gray-600">
            Zarządzaj swoimi wizytami i rezerwuj nowe terminy
          </p>
        </div>
        <button 
          onClick={logout}
          className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          Wyloguj
        </button>
      </div>

      <StudentQuickActions
        onCreate={() => setCurrentView('create')}
        onOpenReservations={() => setCurrentView('reservations')}
      />
    </div>
  );
};
