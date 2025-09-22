import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type NotificationResponse } from '../../../../api/notifications';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationResponse[];
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notifications
}) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) {
      return 'Teraz';
    } else if (diffHours < 24) {
      return `${diffHours}h temu`;
    } else if (diffDays < 7) {
      return `${diffDays}d temu`;
    } else {
      return date.toLocaleDateString('pl-PL');
    }
  };

  const formatReservationDate = (dateStr: string, timeStr: string) => {
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

   const parseNotificationMessage = (message: string) => {
     const topicMatch = message.match(/Wizyta '([^']+)'/);
     const dateMatch = message.match(/zaplanowana na (\d{4}-\d{2}-\d{2})/);
     const timeMatch = message.match(/o (\d{2}:\d{2})/);
     const userMatch = message.match(/została anulowana przez ([^.]+)/);
     const descMatch = message.match(/Opis: (.+)$/);

     const userInfo = userMatch ? userMatch[1] : 'Nieznany użytkownik';
     const isCandidate = userInfo.includes('kandydata');
     const isStudent = userInfo.includes('studenta');

     return {
       topic: topicMatch ? topicMatch[1] : 'Nieznany temat',
       date: dateMatch ? dateMatch[1] : '',
       time: timeMatch ? timeMatch[1] : '',
       user: userInfo,
       userType: isCandidate ? 'Kandydat' : isStudent ? 'Student' : 'Nieznany',
       description: descMatch ? descMatch[1] : null
     };
   };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={handleOverlayClick}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.3
            }}
            className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[80vh] overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-red-100 p-2 rounded-lg">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Powiadomienia o anulowaniu
                    </h3>
                    <p className="text-sm text-gray-600">
                      {notifications.length} {notifications.length === 1 ? 'powiadomienie' : 'powiadomień'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-2">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-12" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Brak powiadomień</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notifications.map((notification) => {
                    const details = parseNotificationMessage(notification.message);
                    const { date, time } = details.date && details.time 
                      ? formatReservationDate(details.date, details.time)
                      : { date: '', time: '' };

                    return (
                      <div
                        key={notification.id}
                        className="border border-gray-200 rounded-lg p-4 bg-red-50"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="bg-red-100 p-2 rounded-lg flex-shrink-0">
                            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-red-900 mb-2">
                              {notification.title}
                            </h4>
                            
                            <div className="bg-white rounded-md p-3 mb-3">
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center">
                                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                  <span className="font-medium text-gray-700">Temat:</span>
                                  <span className="ml-2 text-gray-900">{details.topic}</span>
                                </div>
                                
                                {date && (
                                  <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="font-medium text-gray-700">Data:</span>
                                    <span className="ml-2 text-gray-900">{date}</span>
                                  </div>
                                )}
                                
                                {time && (
                                  <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="font-medium text-gray-700">Godzina:</span>
                                    <span className="ml-2 text-gray-900">{time}</span>
                                  </div>
                                )}
                                
                                 <div className="flex items-center">
                                   <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                   </svg>
                                   <span className="font-medium text-gray-700">Anulowane przez:</span>
                                   <span className="ml-2 text-gray-900">{details.user}</span>
                                 </div>
                                 
                                 <div className="flex items-center">
                                   <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a1.994 1.994 0 01-1.414.586H7a4 4 0 01-4-4V7a4 4 0 014-4z" />
                                   </svg>
                                   <span className="font-medium text-gray-700">Typ użytkownika:</span>
                                   <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                                     details.userType === 'Kandydat' 
                                       ? 'bg-green-100 text-green-800' 
                                       : details.userType === 'Student' 
                                       ? 'bg-blue-100 text-blue-800' 
                                       : 'bg-gray-100 text-gray-800'
                                   }`}>
                                     {details.userType}
                                   </span>
                                 </div>
                                
                                {details.description && (
                                  <div className="pt-2 border-t border-gray-100">
                                    <span className="font-medium text-gray-700">Opis:</span>
                                    <p className="text-gray-900 mt-1">{details.description}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <p className="text-xs text-gray-500">
                              {formatTime(notification.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Zamknij
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
