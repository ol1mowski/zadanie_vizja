import React from 'react';
import { motion } from 'framer-motion';
import { useUnassignedReservations } from './UnassignedReservations/hooks/useUnassignedReservations.hook';
import { UnassignedReservationItem, UnassignedEmptyState } from './UnassignedReservations/components';

interface UnassignedReservationsProps {
  onBack: () => void;
}

export const UnassignedReservations: React.FC<UnassignedReservationsProps> = ({ onBack }) => {
  const {
    reservations,
    loading,
    error,
    assigningId,
    handleAssign,
  } = useUnassignedReservations();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg text-gray-600">Ładowanie rezerwacji...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg"
    >
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Nieprzypisane Rezerwacje</h2>
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Powrót
          </button>
        </div>
        <p className="text-gray-600">
          Przeglądaj i przypisuj do siebie nowe rezerwacje. Pamiętaj, że nie możesz mieć więcej niż jednej wizyty w tym samym terminie.
        </p>
      </div>

      <div className="p-6">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          {reservations.map((reservation) => (
            <UnassignedReservationItem
              key={reservation.id}
              reservation={reservation}
              isAssigning={assigningId === reservation.id}
              onAssign={handleAssign}
            />
          ))}

          {reservations.length === 0 && (
            <UnassignedEmptyState />
          )}
        </div>
      </div>
    </motion.div>
  );
};
