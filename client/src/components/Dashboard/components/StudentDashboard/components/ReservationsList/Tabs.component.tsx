import React from 'react';

type Props = {
  active: 'upcoming' | 'past';
  counts: { upcoming: number; past: number };
  onChange: (tab: 'upcoming' | 'past') => void;
};

export const ReservationsTabs: React.FC<Props> = ({ active, counts, onChange }) => {
  return (
    <div className="flex space-x-4">
      <button
        onClick={() => onChange('upcoming')}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          active === 'upcoming'
            ? 'bg-blue-100 text-blue-800 border border-blue-200'
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        Nadchodzące ({counts.upcoming})
      </button>
      <button
        onClick={() => onChange('past')}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          active === 'past'
            ? 'bg-blue-100 text-blue-800 border border-blue-200'
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        Historia ({counts.past})
      </button>
    </div>
  );
};


