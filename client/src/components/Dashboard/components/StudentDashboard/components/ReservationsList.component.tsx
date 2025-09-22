import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { reservationsApi, type ReservationResponse } from '../../../../../api/reservations';
import { CancelConfirmModal } from '../../Shared/CancelConfirmModal.component';
import { ReservationsHeaderBar } from './ReservationsList/HeaderBar.component';
import { ReservationsTabs } from './ReservationsList/Tabs.component';
import { ReservationItem } from './ReservationsList/ReservationItem.component';
import { ListEmptyState } from './ReservationsList/ListEmptyState.component';

interface ReservationsListProps {
  onBack: () => void;
}

export const ReservationsList: React.FC<ReservationsListProps> = ({ onBack }) => {
  const [reservations, setReservations] = useState<ReservationResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [cancelModalOpen, setCancelModalOpen] = useState<boolean>(false);
  const [reservationToCancel, setReservationToCancel] = useState<ReservationResponse | null>(null);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      const data = await reservationsApi.getStudentReservations();
      setReservations(data);
    } catch (err) {
      setError('Nie udało się załadować rezerwacji');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = (reservation: ReservationResponse) => {
    setReservationToCancel(reservation);
    setCancelModalOpen(true);
  };

  const handleCancelConfirm = async () => {
    if (!reservationToCancel) return;
    
    try {
      await reservationsApi.cancelReservation(reservationToCancel.id);
      await loadReservations(); 
      setCancelModalOpen(false);
      setReservationToCancel(null);
    } catch (err) {
      alert('Nie udało się anulować rezerwacji. Spróbuj ponownie.');
    }
  };

  const handleCancelModalClose = () => {
    setCancelModalOpen(false);
    setReservationToCancel(null);
  };

  const now = new Date();
  const upcomingReservations = reservations.filter(r => {
    const reservationDate = new Date(`${r.date}T${r.time}`);
    return reservationDate >= now && r.status !== 'CANCELLED' && r.status !== 'COMPLETED';
  });

  const pastReservations = reservations.filter(r => {
    const reservationDate = new Date(`${r.date}T${r.time}`);
    return reservationDate < now || r.status === 'CANCELLED' || r.status === 'COMPLETED';
  });

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
      <ReservationsHeaderBar onBack={onBack} />
      <div className="p-6">
        <ReservationsTabs
          active={activeTab}
          counts={{ upcoming: upcomingReservations.length, past: pastReservations.length }}
          onChange={setActiveTab}
        />
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          {(activeTab === 'upcoming' ? upcomingReservations : pastReservations).map((reservation) => (
            <ReservationItem
              key={reservation.id}
              reservation={reservation}
              activeTab={activeTab}
              onCancel={handleCancelClick}
            />
          ))}

          {(activeTab === 'upcoming' ? upcomingReservations : pastReservations).length === 0 && (
            <ListEmptyState variant={activeTab} />
          )}
        </div>
      </div>

      <CancelConfirmModal
        isOpen={cancelModalOpen}
        onClose={handleCancelModalClose}
        onConfirm={handleCancelConfirm}
        reservationTopic={reservationToCancel?.topic || ''}
        reservationDate={reservationToCancel?.date || ''}
        reservationTime={reservationToCancel?.time || ''}
      />
    </motion.div>
  );
};
