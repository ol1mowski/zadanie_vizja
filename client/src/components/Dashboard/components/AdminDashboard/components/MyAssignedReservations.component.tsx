import React from 'react';
import { motion } from 'framer-motion';
import { useMyAssignedReservations } from './MyAssignedReservations/hooks/useMyAssignedReservations.hook';
import { ReservationItem, ReservationsTabs, EmptyState } from './MyAssignedReservations/components';

interface MyAssignedReservationsProps {
  onBack: () => void;
}

export const MyAssignedReservations: React.FC<MyAssignedReservationsProps> = ({ onBack }) => {
  const {
    loading,
    error,
    activeTab,
    upcomingReservations,
    pastReservations,
    setTab,
  } = useMyAssignedReservations();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg text-gray-600">Ładowanie rezerwacji...</div>
      </div>
    );
  }

  const currentReservations = activeTab === 'upcoming' ? upcomingReservations : pastReservations;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg"
    >
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Moje Przypisane Rezerwacje</h2>
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Powrót
          </button>
        </div>

        <ReservationsTabs
          activeTab={activeTab}
          upcomingCount={upcomingReservations.length}
          pastCount={pastReservations.length}
          onTabChange={setTab}
        />
      </div>

      <div className="p-6">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          {currentReservations.map((reservation) => (
            <ReservationItem key={reservation.id} reservation={reservation} />
          ))}

          {currentReservations.length === 0 && (
            <EmptyState activeTab={activeTab} />
          )}
        </div>
      </div>
    </motion.div>
  );
};
