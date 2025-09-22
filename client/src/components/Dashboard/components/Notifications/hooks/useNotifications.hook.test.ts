import { renderHook, act, waitFor } from '@testing-library/react';
import { afterEach, vi, describe, it, expect } from 'vitest';

vi.mock('../../../../../api/notifications', () => ({
  notificationsApi: {
    getAllNotifications: vi.fn(),
  },
}));

import { notificationsApi } from '../../../../../api/notifications';
import { useNotifications } from './useNotifications.hook';

describe('useNotifications', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('liczy ostatnie powiadomienia z 24h i otwiera modal', async () => {
    const now = new Date();
    const within24h = new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString();
    const older = new Date(now.getTime() - 26 * 60 * 60 * 1000).toISOString();

    (notificationsApi.getAllNotifications as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce([
      { id: 1, createdAt: within24h },
      { id: 2, createdAt: older },
    ]);

    const { result } = renderHook(() => useNotifications());

    await waitFor(() => expect(result.current.recentCount).toBe(1));

    (notificationsApi.getAllNotifications as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce([
      { id: 3, createdAt: now.toISOString() },
    ]);

    await act(async () => {
      await result.current.openModal();
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.recentCount).toBe(0);
    expect(result.current.notifications).toHaveLength(1);

    act(() => {
      result.current.closeModal();
    });
    expect(result.current.isOpen).toBe(false);
  });
});


