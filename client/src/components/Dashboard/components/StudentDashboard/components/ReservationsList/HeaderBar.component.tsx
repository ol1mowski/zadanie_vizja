import React from 'react';

type Props = {
  onBack: () => void;
};

export const ReservationsHeaderBar: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Moje Rezerwacje</h2>
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 transition-colors"
        >
          ← Powrót
        </button>
      </div>
    </div>
  );
};


