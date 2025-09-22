import React from 'react';
import { motion } from 'framer-motion';

interface LoginFormHeaderProps {
  userType: 'student' | 'admin';
  onClose: () => void;
}

export const LoginFormHeader: React.FC<LoginFormHeaderProps> = ({ userType, onClose }) => {
  const title = userType === 'student' ? 'Logowanie Studenta' : 'Logowanie Administratora';
  const iconColor = userType === 'student' ? 'text-blue-600' : 'text-purple-600';
  const bgColor = userType === 'student' ? 'bg-blue-100' : 'bg-purple-100';

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center">
        <div className={`${bgColor} p-3 rounded-lg mr-4`}>
          <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          {title}
        </h2>
      </div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </motion.button>
    </div>
  );
};

interface LoginFormFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}

export const LoginFormField: React.FC<LoginFormFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  placeholder,
  required = false
}) => {
  const inputClasses = `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
    error ? 'border-red-500' : 'border-gray-300'
  }`;

  return (
    <div>
      <label className="block text-left text-sm font-medium text-gray-700 mb-2">
        {label} {required && '*'}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={inputClasses}
        placeholder={placeholder}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-left text-sm mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

interface LoginFormButtonsProps {
  userType: 'student' | 'admin';
  onClose: () => void;
}

export const LoginFormButtons: React.FC<LoginFormButtonsProps> = ({ userType, onClose }) => {
  const buttonColor = userType === 'student' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-purple-600 hover:bg-purple-700';
  const buttonText = userType === 'student' ? 'Zaloguj się jako Student' : 'Zaloguj się jako Administrator';

  return (
    <div className="flex justify-end space-x-4 pt-4 border-t">
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Anuluj
      </motion.button>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-6 py-2 ${buttonColor} text-white rounded-lg transition-colors`}
      >
        {buttonText}
      </motion.button>
    </div>
  );
};

interface LoginFormInfoProps {
  userType: 'student' | 'admin';
}

export const LoginFormInfo: React.FC<LoginFormInfoProps> = ({ userType }) => {
  const info = userType === 'student' 
    ? {
        title: 'Logowanie dla Studentów',
        description: 'Zaloguj się używając swojego konta studenckiego, aby zarezerwować wizytę i zarządzać swoimi spotkaniami.',
        features: [
          'Rezerwacja wizyt z pracownikami biura',
          'Monitorowanie statusu wizyt',
          'Historia wszystkich spotkań',
          'Powiadomienia o zmianach terminów'
        ]
      }
    : {
        title: 'Logowanie dla Administratorów',
        description: 'Zaloguj się używając konta administratora, aby zarządzać rezerwacjami i przypisywać wizyty.',
        features: [
          'Przeglądanie dostępnych rezerwacji',
          'Przypisywanie wizyt do siebie',
          'Zarządzanie kalendarzem',
          'Generowanie raportów'
        ]
      };

  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {info.title}
      </h3>
      <p className="text-gray-600 text-sm mb-4">
        {info.description}
      </p>
      <div className="bg-white border rounded-md p-3 mb-4 text-sm text-gray-700">
        <p className="font-semibold mb-1">Dane testowe do logowania:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <span className="text-gray-500">Student:</span>
            <div>login: <code className="bg-gray-100 px-1 rounded">student1@example.edu</code></div>
            <div>hasło: <code className="bg-gray-100 px-1 rounded">Qwerty123!@#</code></div>
          </div>
          <div>
            <span className="text-gray-500">Administrator:</span>
            <div>login: <code className="bg-gray-100 px-1 rounded">admin1@example.edu</code></div>
            <div>hasło: <code className="bg-gray-100 px-1 rounded">Qwerty123!@#</code></div>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {info.features.map((feature, index) => (
          <div key={index} className="flex items-center text-sm text-gray-600">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
};
