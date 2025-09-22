import React from 'react';
import { type ReservationResponse } from '../../../../../../api/reservations';
import { AttachmentsList } from '../../../Attachments/AttachmentsList.component';

type Props = {
  reservation: ReservationResponse;
  activeTab: 'upcoming' | 'past';
  onCancel: (reservation: ReservationResponse) => void;
};

const statusStyles: Record<ReservationResponse['status'], string> = {
  PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  ASSIGNED: 'bg-blue-100 text-blue-800 border-blue-200',
  CANCELLED: 'bg-red-100 text-red-800 border-red-200',
  COMPLETED: 'bg-green-100 text-green-800 border-green-200',
};

const statusLabels: Record<ReservationResponse['status'], string> = {
  PENDING: 'Oczekuje',
  ASSIGNED: 'Przypisana',
  CANCELLED: 'Anulowana',
  COMPLETED: 'Zakończona',
};

export const ReservationItem: React.FC<Props> = ({ reservation, activeTab, onCancel }) => {
  const date = new Date(`${reservation.date}T${reservation.time}`);
  const formattedDate = date.toLocaleDateString('pl-PL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="font-semibold text-gray-900">{reservation.topic}</h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${statusStyles[reservation.status]}`}>
              {statusLabels[reservation.status]}
            </span>
          </div>

          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formattedDate}
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {reservation.time}
            </div>
            {reservation.assignedEmployeeUsername && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Pracownik: {reservation.assignedEmployeeUsername}
              </div>
            )}
          </div>

          {reservation.description && (
            <p className="mt-2 text-sm text-gray-700">{reservation.description}</p>
          )}

          {reservation.attachments && reservation.attachments.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-medium text-gray-700 mb-2">Załączniki:</p>
              <AttachmentsList attachments={reservation.attachments} canDelete={false} />
            </div>
          )}
        </div>

        {activeTab === 'upcoming' && reservation.status !== 'CANCELLED' && (
          <button
            onClick={() => onCancel(reservation)}
            className="ml-4 px-3 py-1 text-sm text-red-600 hover:text-red-800 border border-red-300 hover:border-red-400 rounded transition-colors"
          >
            Anuluj
          </button>
        )}
      </div>
    </div>
  );
};


