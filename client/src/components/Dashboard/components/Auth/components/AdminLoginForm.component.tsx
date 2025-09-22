import React from 'react';
import { useAdminLogin, type AdminLoginData } from '../hooks/useAdminLogin.hook';
import { LoginFormField } from './LoginFormField.component';
import { LoginFormInfo } from './LoginFormInfo.component';

interface AdminLoginFormProps {
  onSubmit: (data: AdminLoginData) => Promise<void>;
  onClose: () => void;
}

export const AdminLoginForm: React.FC<AdminLoginFormProps> = ({ onSubmit, onClose }) => {
  const { formData, errors, handleInputChange, handleSubmit, resetForm } = useAdminLogin();

  const handleFormSubmit = (e: React.FormEvent) => {
    handleSubmit(e, onSubmit, onClose);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Logowanie - Administrator</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <LoginFormInfo userType="admin" />

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <LoginFormField
            label="E-mail pracowniczy"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            placeholder="np. j.kowalski@uczelnia.pl"
            required
          />
          
          <LoginFormField
            label="Hasło"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            placeholder="Wprowadź hasło"
            required
          />
          
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Zaloguj się
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Anuluj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
