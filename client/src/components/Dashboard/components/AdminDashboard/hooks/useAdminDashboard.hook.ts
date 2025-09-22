import { useState, useEffect, useCallback } from 'react';
import { reservationsApi } from '../../../../../api/reservations';

export type AdminStats = {
  unassigned: number;
  myReservations: number;
  today: number;
  completed: number;
};

type ViewType = 'dashboard' | 'unassigned' | 'my-reservations';

export const useAdminDashboard = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [stats, setStats] = useState<AdminStats>({
    unassigned: 0,
    myReservations: 0,
    today: 0,
    completed: 0
  });

  const loadStats = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    if (currentView === 'dashboard') {
      void loadStats();
    }
  }, [currentView, loadStats]);

  const navigateToView = useCallback((view: ViewType) => {
    setCurrentView(view);
  }, []);

  const navigateBack = useCallback(() => {
    setCurrentView('dashboard');
  }, []);

  return {
    currentView,
    stats,
    loadStats,
    navigateToView,
    navigateBack,
  } as const;
};
