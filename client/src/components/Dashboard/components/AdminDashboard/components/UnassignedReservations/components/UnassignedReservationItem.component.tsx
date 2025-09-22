import React from 'react';
import type { ReservationResponse } from '../../../../../../../api/reservations';
import { AttachmentsList } from '../../../../Attachments/AttachmentsList.component';
import { ReservationTypeIcon } from '../../MyAssignedReservations/components/ReservationTypeIcon.component';

interface UnassignedReservationItemProps {
  reservation: ReservationResponse;
  isAssigning: boolean;
  onAssign: (id: number) => void;
}

export const UnassignedReservationItem: React.FC<UnassignedReservationItemProps> = ({
  reservation,
  isAssigning,
  onAssign
}) => {
  const formatDate = (dateStr: string, timeStr: string) => {
    const date = new Date(`${dateStr}T${timeStr}`);
    return {
      date: date.toLocaleDateString('pl-PL', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: timeStr
    };
  };

  const getReservationType = (reservation: ReservationResponse) => {
    return reservation.userType === 'STUDENT' ? 'Student' : 'Kandydat';
  };

  const { date, time } = formatDate(reservation.date, reservation.time);

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <ReservationTypeIcon reservation={reservation} />
            <div>
              <h3 className="font-semibold text-gray-900">{reservation.topic}</h3>
              <span className="text-sm text-gray-500">
                {getReservationType(reservation)}
              </span>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 space-y-1 ml-11">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {date}
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {time}
            </div>
          </div>

          {reservation.description && (
            <p className="mt-2 text-sm text-gray-700 ml-11">{reservation.description}</p>
          )}

          {reservation.attachments && reservation.attachments.length > 0 && (
            <div className="mt-3 ml-11">
              <p className="text-sm font-medium text-gray-700 mb-2">Załączniki:</p>
              <AttachmentsList 
                attachments={reservation.attachments}
                canDelete={false}
              />
            </div>
          )}
        </div>

        <button
          onClick={() => onAssign(reservation.id)}
          disabled={isAssigning}
          className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium rounded-lg transition-colors"
        >
          {isAssigning ? 'Przypisuję...' : 'Przypisz do siebie'}
        </button>
      </div>
    </div>
  );
};
