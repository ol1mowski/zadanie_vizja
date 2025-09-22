import React from 'react';

interface LoginFormHeaderProps {
  userType: 'student' | 'admin';
  onClose: () => void;
}

export const LoginFormHeader: React.FC<LoginFormHeaderProps> = ({ userType, onClose }) => {
  const title = userType === 'student' ? 'Logowanie – Student' : 'Logowanie – Administrator';

  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Zamknij"
        type="button"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};
