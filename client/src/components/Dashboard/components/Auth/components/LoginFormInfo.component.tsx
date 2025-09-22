import React from 'react';

interface LoginFormInfoProps {
  userType: 'student' | 'admin';
}

export const LoginFormInfo: React.FC<LoginFormInfoProps> = ({ userType }) => {
  return (
    <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
      {userType === 'student'
        ? 'Zaloguj się używając loginu lub e-maila oraz hasła.'
        : 'Zaloguj się do panelu administratora.'}
    </div>
  );
};
