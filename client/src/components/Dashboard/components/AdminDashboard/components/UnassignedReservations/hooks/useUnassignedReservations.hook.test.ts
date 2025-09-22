import { renderHook, act, waitFor } from '@testing-library/react';
import { vi, describe, afterEach, it, expect } from 'vitest';

vi.mock('../../../../../../../api/reservations', () => ({
  reservationsApi: {
    getUnassignedReservations: vi.fn(),
    assignReservation: vi.fn(),
  },
}));

const mockShowToast = vi.fn();
vi.mock('../../../../../../Toast/ToastProvider', () => ({
  useToast: () => ({ showToast: mockShowToast }),
}));

import { reservationsApi } from '../../../../../../../api/reservations';
import { useUnassignedReservations } from './useUnassignedReservations.hook';

describe('useUnassignedReservations', () => {
  afterEach(() => { 
    vi.clearAllMocks();
    mockShowToast.mockClear();
  });

  it('ładuje rezerwacje i obsługuje przypisanie', async () => {
    (reservationsApi.getUnassignedReservations as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce([
      { id: 10 },
    ]);

    const { result } = renderHook(() => useUnassignedReservations());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.reservations).toHaveLength(1);

    (reservationsApi.assignReservation as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(undefined);
    (reservationsApi.getUnassignedReservations as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce([]);

    act(() => {
      void result.current.handleAssign(10);
    });

    await waitFor(() => {
      expect(reservationsApi.assignReservation).toHaveBeenCalledWith(10);
    });
  });

  it('ustawia błąd i pokazuje toast przy błędzie ładowania', async () => {
    (reservationsApi.getUnassignedReservations as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('fail'));

    const { result } = renderHook(() => useUnassignedReservations());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe('Nie udało się załadować rezerwacji');
    });
  });
});


