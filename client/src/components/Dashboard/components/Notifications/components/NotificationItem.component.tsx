import React from 'react';
import { formatReservationDate, parseNotificationMessage, formatTimeFromNow } from '../utils/format';
import type { NotificationResponse } from '../../../../../api/notifications';

interface NotificationItemProps {
  notification: NotificationResponse;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const details = parseNotificationMessage(notification.message);
  const { date, time } = details.date && details.time
    ? formatReservationDate(details.date, details.time)
    : { date: '', time: '' };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-red-50">
      <div className="flex items-start space-x-3">
        <div className="bg-red-100 p-2 rounded-lg flex-shrink-0">
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-red-900 mb-2">{notification.title}</h4>
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
          <p className="text-xs text-gray-500">{formatTimeFromNow(notification.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};
