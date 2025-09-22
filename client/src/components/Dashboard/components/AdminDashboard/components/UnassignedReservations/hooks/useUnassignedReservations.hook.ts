import { useState, useEffect, useCallback } from 'react';
import { reservationsApi, type ReservationResponse } from '../../../../../../../api/reservations';

export const useUnassignedReservations = () => {
  const [reservations, setReservations] = useState<ReservationResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [assigningId, setAssigningId] = useState<number | null>(null);

  const loadReservations = useCallback(async () => {
    try {
      setError(null);
      const data = await reservationsApi.getUnassignedReservations();
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

  const handleAssign = useCallback(async (id: number) => {
    if (assigningId) return; 
    
    try {
      setAssigningId(id);
      await reservationsApi.assignReservation(id);
      await loadReservations(); 
    } catch (err) {
      alert('Nie udało się przypisać rezerwacji. Może już została przypisana lub masz konflikt terminów.');
    } finally {
      setAssigningId(null);
    }
  }, [assigningId, loadReservations]);

  return {
    reservations,
    loading,
    error,
    assigningId,
    handleAssign,
    loadReservations,
  } as const;
};
