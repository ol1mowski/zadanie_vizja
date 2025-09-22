import React from 'react';

interface LoginFormButtonsProps {
  userType: 'student' | 'admin';
  onClose: () => void;
}

export const LoginFormButtons: React.FC<LoginFormButtonsProps> = ({ userType, onClose }) => {
  const submitLabel = userType === 'student' ? 'Zaloguj się' : 'Zaloguj do panelu';
  return (
    <div className="flex justify-end space-x-4 pt-2">
      <button
        type="button"
        onClick={onClose}
        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Anuluj
      </button>
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {submitLabel}
      </button>
    </div>
  );
};
