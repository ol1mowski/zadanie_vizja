import React from 'react';

interface ReservationsTabsProps {
  activeTab: 'upcoming' | 'past';
  upcomingCount: number;
  pastCount: number;
  onTabChange: (tab: 'upcoming' | 'past') => void;
}

export const ReservationsTabs: React.FC<ReservationsTabsProps> = ({
  activeTab,
  upcomingCount,
  pastCount,
  onTabChange
}) => {
  return (
    <div className="flex space-x-4">
      <button
        onClick={() => onTabChange('upcoming')}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          activeTab === 'upcoming'
            ? 'bg-blue-100 text-blue-800 border border-blue-200'
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        Nadchodzące ({upcomingCount})
      </button>
      <button
        onClick={() => onTabChange('past')}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          activeTab === 'past'
            ? 'bg-blue-100 text-blue-800 border border-blue-200'
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        Historia ({pastCount})
      </button>
    </div>
  );
};
