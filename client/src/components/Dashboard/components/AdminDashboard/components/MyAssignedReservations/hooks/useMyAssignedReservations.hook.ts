import { useState, useEffect, useCallback, useMemo } from 'react';
import { reservationsApi, type ReservationResponse } from '../../../../../../api/reservations';

export const useMyAssignedReservations = () => {
  const [reservations, setReservations] = useState<ReservationResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const loadReservations = useCallback(async () => {
    try {
      setError(null);
      const data = await reservationsApi.getMyAssignedReservations();
      setReservations(data);
    } catch (err) {
      setError('Nie udało się załadować rezerwacji');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadReservations();
  }, [loadReservations]);

  const now = useMemo(() => new Date(), []);

  const upcomingReservations = useMemo(() => {
    return reservations.filter(r => {
      const reservationDate = new Date(`${r.date}T${r.time}`);
      return reservationDate >= now && r.status !== 'CANCELLED' && r.status !== 'COMPLETED';
    });
  }, [reservations, now]);

  const pastReservations = useMemo(() => {
    return reservations.filter(r => {
      const reservationDate = new Date(`${r.date}T${r.time}`);
      return reservationDate < now || r.status === 'CANCELLED' || r.status === 'COMPLETED';
    });
  }, [reservations, now]);

  const setTab = useCallback((tab: 'upcoming' | 'past') => {
    setActiveTab(tab);
  }, []);

  return {
    reservations,
    loading,
    error,
    activeTab,
    upcomingReservations,
    pastReservations,
    setTab,
    loadReservations,
  } as const;
};
