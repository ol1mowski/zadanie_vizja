import React from 'react';
import { useStudentLogin, type StudentLoginData } from '../hooks/useStudentLogin.hook';
import { LoginFormField } from './LoginFormField.component';
import { LoginFormInfo } from './LoginFormInfo.component';

interface StudentLoginFormProps {
  onSubmit: (data: StudentLoginData) => Promise<void>;
  onClose: () => void;
}

export const StudentLoginForm: React.FC<StudentLoginFormProps> = ({ onSubmit, onClose }) => {
  const { formData, errors, handleInputChange, handleSubmit, resetForm } = useStudentLogin();

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
          <h2 className="text-xl font-bold text-gray-900">Logowanie - Student</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <LoginFormInfo userType="student" />

        {errors.server && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{errors.server}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <LoginFormField
            label="Numer albumu"
            name="albumNumber"
            type="text"
            value={formData.albumNumber}
            onChange={handleInputChange}
            error={errors.albumNumber}
            placeholder="np. 123456"
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
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
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
