import React from 'react';

type Props = {
  variant: 'upcoming' | 'past';
};

export const ListEmptyState: React.FC<Props> = ({ variant }) => {
  return (
    <div className="text-center py-8">
      <div className="text-gray-400 mb-2">
        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <p className="text-gray-600">
        {variant === 'upcoming' 
          ? 'Nie masz żadnych nadchodzących rezerwacji' 
          : 'Nie masz jeszcze historii wizyt'}
      </p>
    </div>
  );
};


