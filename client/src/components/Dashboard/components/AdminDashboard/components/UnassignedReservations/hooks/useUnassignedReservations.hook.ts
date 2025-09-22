import { useState, useEffect, useCallback } from 'react';
import { reservationsApi, type ReservationResponse } from '../../../../../../../api/reservations';
import { useToast } from '../../../../../../Toast/ToastProvider';

export const useUnassignedReservations = () => {
  const [reservations, setReservations] = useState<ReservationResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [assigningId, setAssigningId] = useState<number | null>(null);
  const { showToast } = useToast();

  const loadReservations = useCallback(async () => {
    try {
      setError(null);
      const data = await reservationsApi.getUnassignedReservations();
      setReservations(data);
    } catch (err) {
      setError('Nie udało się załadować rezerwacji');
      showToast('Nie udało się załadować rezerwacji', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    void loadReservations();
  }, [loadReservations]);

  const handleAssign = useCallback(async (id: number) => {
    if (assigningId) return; 
    
    try {
      setAssigningId(id);
      await reservationsApi.assignReservation(id);
      await loadReservations(); 
      showToast('Rezerwacja przypisana do Ciebie', 'success');
    } catch (err) {
      showToast('Nie udało się przypisać rezerwacji', 'error');
    } finally {
      setAssigningId(null);
    }
  }, [assigningId, loadReservations, showToast]);

  return {
    reservations,
    loading,
    error,
    assigningId,
    handleAssign,
    loadReservations,
  } as const;
};
