import React from 'react';
import { useUser } from '../../../../contexts/UserContext';
import { UnassignedReservations } from './components/UnassignedReservations.component';
import { MyAssignedReservations } from './components/MyAssignedReservations.component';
import { useAdminDashboard } from './hooks/useAdminDashboard.hook';
import { AdminHeader, AdminQuickActions, AdminStatsCards } from './components';

export const AdminDashboard: React.FC = () => {
  const { logout } = useUser();
  const { currentView, stats, navigateToView, navigateBack } = useAdminDashboard();

  if (currentView === 'unassigned') {
    return (
      <UnassignedReservations onBack={navigateBack} />
    );
  }

  if (currentView === 'my-reservations') {
    return (
      <MyAssignedReservations onBack={navigateBack} />
    );
  }

  return (
    <div>
      <AdminHeader onLogout={logout} />

      <AdminQuickActions
        stats={stats}
        onNavigateToUnassigned={() => navigateToView('unassigned')}
        onNavigateToMyReservations={() => navigateToView('my-reservations')}
      />

      <AdminStatsCards stats={stats} />
    </div>
  );
};
