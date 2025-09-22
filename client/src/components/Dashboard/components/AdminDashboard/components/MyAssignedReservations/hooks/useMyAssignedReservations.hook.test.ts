import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, vi, describe, it, expect } from 'vitest';

vi.mock('../../../../../../../api/reservations', () => ({
  reservationsApi: {
    getMyAssignedReservations: vi.fn(),
  },
}));

import { reservationsApi } from '../../../../../../../api/reservations';
import { useMyAssignedReservations } from './useMyAssignedReservations.hook';

describe('useMyAssignedReservations', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('ładuje rezerwacje i dzieli na przyszłe oraz przeszłe', async () => {
    const now = new Date();
    const future = new Date(now.getTime() + 60 * 60 * 1000);
    const past = new Date(now.getTime() - 60 * 60 * 1000);

    (reservationsApi.getMyAssignedReservations as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce([
      { id: 1, date: future.toISOString().slice(0, 10), time: future.toTimeString().slice(0, 5), status: 'NEW' },
      { id: 2, date: past.toISOString().slice(0, 10), time: past.toTimeString().slice(0, 5), status: 'NEW' },
      { id: 3, date: future.toISOString().slice(0, 10), time: future.toTimeString().slice(0, 5), status: 'CANCELLED' },
      { id: 4, date: past.toISOString().slice(0, 10), time: past.toTimeString().slice(0, 5), status: 'COMPLETED' },
    ]);

    const { result } = renderHook(() => useMyAssignedReservations());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeNull();
    expect(result.current.reservations).toHaveLength(4);
    expect(result.current.upcomingReservations).toHaveLength(1); // tylko aktywna przyszła (nie CANCELLED/COMPLETED)
    expect(result.current.pastReservations).toHaveLength(3); // przeszłe + CANCELLED + COMPLETED
  });

  it('ustawia błąd gdy API zwróci błąd', async () => {
    (reservationsApi.getMyAssignedReservations as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('fail'));

    const { result } = renderHook(() => useMyAssignedReservations());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe('Nie udało się załadować rezerwacji');
  });
});


