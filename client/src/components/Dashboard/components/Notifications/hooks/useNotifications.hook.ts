import { useCallback, useEffect, useState } from 'react';
import { notificationsApi, type NotificationResponse } from '../../../../../api/notifications';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
  const [recentCount, setRecentCount] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadRecentCount = useCallback(async () => {
    try {
      const allNotifications = await notificationsApi.getAllNotifications();
      const yesterday = new Date();
      yesterday.setHours(yesterday.getHours() - 24);
      const recentNotifications = allNotifications.filter(n => new Date(n.createdAt) >= yesterday);
      setRecentCount(recentNotifications.length);
    } catch (error) {
      console.error('Failed to load recent notifications count:', error);
    }
  }, []);

  const loadNotifications = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const data = await notificationsApi.getAllNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const openModal = useCallback(async () => {
    setRecentCount(0);
    await loadNotifications();
    setIsOpen(true);
  }, [loadNotifications]);

  const closeModal = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    void loadRecentCount();
    const interval = setInterval(() => { void loadRecentCount(); }, 30000);
    return () => clearInterval(interval);
  }, [loadRecentCount]);

  return {
    notifications,
    recentCount,
    isOpen,
    loading,
    openModal,
    closeModal,
  } as const;
};
