import React from 'react';

export const UnassignedEmptyState: React.FC = () => {
  return (
    <div className="text-center py-8">
      <div className="text-gray-400 mb-2">
        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 8h6m-6 4h6" />
        </svg>
      </div>
      <p className="text-gray-600">
        Brak nieprzypisanych rezerwacji
      </p>
      <p className="text-gray-500 text-sm mt-1">
        Wszystkie rezerwacje zostały już przypisane do pracowników
      </p>
    </div>
  );
};
