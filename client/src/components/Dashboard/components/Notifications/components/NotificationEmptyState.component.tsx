import React from 'react';

export const NotificationEmptyState: React.FC = () => {
  return (
    <div className="text-center py-8">
      <div className="text-gray-400 mb-2">
        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-12" />
        </svg>
      </div>
      <p className="text-gray-600">Brak powiadomień</p>
    </div>
  );
};
