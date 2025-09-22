import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { reservationsApi, type ReservationResponse } from '../../../../api/reservations';
import { AttachmentsList } from '../AttachmentsList';

interface UnassignedReservationsProps {
  onBack: () => void;
}

export const UnassignedReservations: React.FC<UnassignedReservationsProps> = ({ onBack }) => {
  const [reservations, setReservations] = useState<ReservationResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [assigningId, setAssigningId] = useState<number | null>(null);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      setError(null);
      const data = await reservationsApi.getUnassignedReservations();
      setReservations(data);
    } catch (err) {
      setError('Nie udało się załadować rezerwacji');
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (id: number) => {
    if (assigningId) return; 
    
    try {
      setAssigningId(id);
      await reservationsApi.assignReservation(id);
      await loadReservations(); 
    } catch (err) {
      alert('Nie udało się przypisać rezerwacji. Może już została przypisana lub masz konflikt terminów.');
    } finally {
      setAssigningId(null);
    }
  };

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

  const getReservationTypeIcon = (reservation: ReservationResponse) => {        
    const isStudent = reservation.userType === 'STUDENT';
    
    if (isStudent) {
      return (
        <div className="bg-blue-100 p-2 rounded-lg">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      );
    } else {
      return (
        <div className="bg-green-100 p-2 rounded-lg">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
      );
    }
  };

  const getReservationType = (reservation: ReservationResponse) => {
    return reservation.userType === 'STUDENT' ? 'Student' : 'Kandydat';
  };

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
          {reservations.map((reservation) => {
            const { date, time } = formatDate(reservation.date, reservation.time);
            const isAssigning = assigningId === reservation.id;
            
            return (
              <div
                key={reservation.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getReservationTypeIcon(reservation)}
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
                    onClick={() => handleAssign(reservation.id)}
                    disabled={isAssigning}
                    className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    {isAssigning ? 'Przypisuję...' : 'Przypisz do siebie'}
                  </button>
                </div>
              </div>
            );
          })}

          {reservations.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 8h6m-6 4h6" />
                </svg>
              </div>
              <p className="text-gray-600">
                Brak nieprzypisanych rezerwacji
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Wszystkie rezerwacje zostały już przypisane do pracowników
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
