import React from 'react';
import type { ReservationResponse } from '../../../../../../../api/reservations';

interface ReservationStatusBadgeProps {
  status: ReservationResponse['status'];
}

export const ReservationStatusBadge: React.FC<ReservationStatusBadgeProps> = ({ status }) => {
  const styles = {
    PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    ASSIGNED: 'bg-blue-100 text-blue-800 border-blue-200',
    CANCELLED: 'bg-red-100 text-red-800 border-red-200',
    COMPLETED: 'bg-green-100 text-green-800 border-green-200'
  };

  const labels = {
    PENDING: 'Oczekuje',
    ASSIGNED: 'Przypisana',
    CANCELLED: 'Anulowana',
    COMPLETED: 'Zakończona'
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};
