import React from 'react';

interface LoginFormFieldProps {
  label: string;
  name: 'email' | 'password' | 'albumNumber';
  type: 'text' | 'password' | 'email';
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
  required
}) => {
  return (
    <div>
      <label className="block text-left text-sm font-medium text-gray-700 mb-1">
        {label} {required && '*'}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && (
        <p className="text-red-500 text-left text-sm mt-1">{error}</p>
      )}
    </div>
  );
};
