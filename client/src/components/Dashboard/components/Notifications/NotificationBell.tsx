import React from 'react';
import { useNotifications } from './hooks/useNotifications.hook';
import { NotificationModal } from './NotificationModal';

export const NotificationBell: React.FC = () => {
  const { notifications, recentCount, isOpen, openModal, closeModal } = useNotifications();

  return (
    <div className="relative">
      <button
        onClick={openModal}
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
        onClose={closeModal}
        notifications={notifications}
      />
    </div>
  );
};
