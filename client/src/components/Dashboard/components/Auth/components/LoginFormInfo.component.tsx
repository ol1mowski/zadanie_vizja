import React, { useState } from 'react';

interface LoginFormInfoProps {
  userType: 'student' | 'admin';
}

export const LoginFormInfo: React.FC<LoginFormInfoProps> = ({ userType }) => {
  const isStudent = userType === 'student';
  const login = isStudent ? 'student1@example.edu' : 'admin1@example.edu';
  const password = 'Qwerty123!@#';
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleCopy = async (text: string, item: 'login' | 'password') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(item);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch {
      // no-op
    }
  };

  return (
    <div className="mb-4 p-3 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg text-sm text-gray-700">
      {isStudent
        ? 'Zaloguj się używając loginu lub e-maila oraz hasła.'
        : 'Zaloguj się do panelu administratora.'}

      <div className="mt-3 bg-white text-left border rounded-md p-3 shadow-sm">
        <div className="flex items-center mb-3">
          <div className={`${isStudent ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'} p-2 rounded-md mr-2`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <p className="font-semibold text-gray-900">
            Dane testowe do logowania
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="text-left w-full">
            <span className="text-gray-500 block mb-1">{isStudent ? 'Student' : 'Administrator'}:</span>
            <div className="flex items-center flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border">
                <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0z" />
                </svg>
                {login}
              </span>
              <button
                type="button"
                onClick={() => handleCopy(login, 'login')}
                className={`px-2 py-1 text-xs rounded-md border transition-colors ${
                  copiedItem === 'login' 
                    ? 'bg-green-100 text-green-800 border-green-300' 
                    : 'text-gray-600 hover:text-gray-800 hover:border-gray-400'
                }`}
                aria-label="Kopiuj login"
              >
                {copiedItem === 'login' ? 'Skopiowano!' : 'Kopiuj'}
              </button>
            </div>
            <div className="flex items-center flex-wrap gap-2 mt-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border">
                <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.657-1.79-3-4-3s-4 1.343-4 3m8 0c0 1.657 1.79 3 4 3s4-1.343 4-3m-8 0v6" />
                </svg>
                {password}
              </span>
              <button
                type="button"
                onClick={() => handleCopy(password, 'password')}
                className={`px-2 py-1 text-xs rounded-md border transition-colors ${
                  copiedItem === 'password' 
                    ? 'bg-green-100 text-green-800 border-green-300' 
                    : 'text-gray-600 hover:text-gray-800 hover:border-gray-400'
                }`}
                aria-label="Kopiuj hasło"
              >
                {copiedItem === 'password' ? 'Skopiowano!' : 'Kopiuj'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
