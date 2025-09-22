import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { reservationsApi, type ReservationResponse } from '../../../../../api/reservations';

export type StudentStats = {
  upcoming: number;
  completed: number;
  pending: number;
};

type UseStudentStatsOptions = {
  enabled?: boolean;
};

export const useStudentStats = (options: UseStudentStatsOptions = {}) => {
  const { enabled = true } = options;
  const [reservations, setReservations] = useState<ReservationResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const computeStats = useCallback((items: ReservationResponse[]): StudentStats => {
    const now = new Date();
    let upcoming = 0;
    let completed = 0;
    let pending = 0;

    for (const r of items) {
      switch (r.status) {
        case 'COMPLETED':
          completed += 1;
          break;
        case 'PENDING':
          pending += 1;
          break;
      }

      const reservationDate = new Date(`${r.date}T${r.time}`);
      const isActive = r.status === 'PENDING' || r.status === 'ASSIGNED';
      if (reservationDate >= now && isActive) {
        upcoming += 1;
      }
    }

    return { upcoming, completed, pending };
  }, []);

  const stats: StudentStats = useMemo(() => computeStats(reservations), [computeStats, reservations]);

  const refreshStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await reservationsApi.getStudentReservations();
      if (!mountedRef.current) return;
      setReservations(data);
    } catch (err) {
      if (!mountedRef.current) return;
      setError(err);
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (enabled) {
      void refreshStats();
    }
  }, [enabled, refreshStats]);

  return {
    reservations,
    stats,
    loading,
    error,
    refreshStats,
  } as const;
};