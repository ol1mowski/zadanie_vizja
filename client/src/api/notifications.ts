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

  getUnreadNotifications: async (): Promise<NotificationResponse[]> => {
    const response = await fetch(`${API_BASE}/api/notifications/unread`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch unread notifications');
    return response.json();
  },

  getUnreadCount: async (): Promise<number> => {
    const response = await fetch(`${API_BASE}/api/notifications/unread/count`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch unread count');
    const data = await response.json();
    return data.count;
  },

  markAsRead: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE}/api/notifications/${id}/read`, {
      method: 'PUT',
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to mark notification as read');
  },

  markAllAsRead: async (): Promise<void> => {
    const response = await fetch(`${API_BASE}/api/notifications/read-all`, {
      method: 'PUT',
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to mark all notifications as read');
  }
};
