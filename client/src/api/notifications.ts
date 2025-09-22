const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

export interface NotificationResponse {
  id: number;
  type: 'RESERVATION_CANCELLED' | 'RESERVATION_ASSIGNED' | 'RESERVATION_REMINDER';
  title: string;
  message: string;
  relatedReservationId?: number;
  isRead: boolean;
  createdAt: string;
}

export const notificationsApi = {
  getAllNotifications: async (): Promise<NotificationResponse[]> => {
    const response = await fetch(`${API_BASE}/api/notifications`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch notifications');
    return response.json();
  },

};
