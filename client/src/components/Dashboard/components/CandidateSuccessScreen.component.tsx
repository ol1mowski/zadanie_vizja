import React from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../../../contexts/UserContext';

interface CandidateSuccessScreenProps {
  reservationData: {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    preferredDate: string;
    preferredTime: string;
  };
}

export const CandidateSuccessScreen: React.FC<CandidateSuccessScreenProps> = ({
  reservationData
}) => {
  const { logout } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30,
          duration: 0.5 
        }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
        >
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-gray-900 mb-4"
        >
          Rezerwacja Złożona Pomyślnie!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-600 mb-8"
        >
          Twoja rezerwacja wizyty została pomyślnie złożona. Otrzymasz potwierdzenie na podany adres email.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-50 rounded-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Szczegóły Rezerwacji
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div>
              <span className="text-sm font-medium text-gray-600">Imię i nazwisko:</span>
              <p className="text-gray-900 font-medium">{reservationData.firstName} {reservationData.lastName}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Email:</span>
              <p className="text-gray-900 font-medium">{reservationData.email}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Temat wizyty:</span>
              <p className="text-gray-900 font-medium">{reservationData.subject}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Preferowany termin:</span>
              <p className="text-gray-900 font-medium">
                {new Date(reservationData.preferredDate).toLocaleDateString('pl-PL')} o {reservationData.preferredTime}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Powrót do Strony Głównej
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};
