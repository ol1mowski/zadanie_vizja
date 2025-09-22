import { useState, useCallback } from 'react';

export type AdminStats = {
  unassigned: number;
  myReservations: number;
  today: number;
  completed: number;
};

type ViewType = 'dashboard' | 'unassigned' | 'my-reservations';

export const useAdminDashboard = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');


  const navigateToView = useCallback((view: ViewType) => {
    setCurrentView(view);
  }, []);

  const navigateBack = useCallback(() => {
    setCurrentView('dashboard');
  }, []);

  return {
    currentView,
    navigateToView,
    navigateBack,
  } as const;
};
