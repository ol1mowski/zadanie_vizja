import React, { useState, useEffect } from 'react';
import { notificationsApi, type NotificationResponse } from '../../../../api/notifications';
import { NotificationModal } from './NotificationModal';

export const NotificationBell: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
  const [recentCount, setRecentCount] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRecentCount();
    const interval = setInterval(loadRecentCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadRecentCount = async () => {
    try {
      const allNotifications = await notificationsApi.getAllNotifications();
      const yesterday = new Date();
      yesterday.setHours(yesterday.getHours() - 24);
      
      const recentNotifications = allNotifications.filter(notification => 
        new Date(notification.createdAt) >= yesterday
      );
      
      setRecentCount(recentNotifications.length);
    } catch (error) {
      console.error('Failed to load recent notifications count:', error);
    }
  };

  const loadNotifications = async () => {
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
  };

  const handleBellClick = async () => {
    setRecentCount(0);
    
    await loadNotifications();
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };



  return (
    <div className="relative">
      <button
        onClick={handleBellClick}
        className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-12" />
        </svg>
        {recentCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {recentCount > 99 ? '99+' : recentCount}
          </span>
        )}
      </button>

      <NotificationModal
        isOpen={isOpen}
        onClose={handleModalClose}
        notifications={notifications}
      />
    </div>
  );
};
