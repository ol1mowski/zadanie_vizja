import React from 'react';

type Props = {
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ContactFields: React.FC<Props> = ({ email, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
      <input type="email" name="email" value={email} onChange={onChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
    </div>
  );
};


