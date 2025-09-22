import React from 'react';

type Props = {
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fieldErrors: Partial<Record<string, string>>;
};

export const ContactFields: React.FC<Props> = ({ email, onChange, fieldErrors }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
      <input 
        type="email" 
        name="email" 
        value={email} 
        onChange={onChange} 
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          fieldErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
        }`} 
      />
      {fieldErrors.email && (
        <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
      )}
    </div>
  );
};


