import React from 'react';

type Props = {
  firstName: string;
  lastName: string;
  pesel: string;
  phone: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const PersonalInfoFields: React.FC<Props> = ({ firstName, lastName, pesel, phone, onChange }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Imię *</label>
          <input type="text" name="firstName" value={firstName} onChange={onChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nazwisko *</label>
          <input type="text" name="lastName" value={lastName} onChange={onChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">PESEL *</label>
          <input type="text" name="pesel" value={pesel} onChange={onChange} pattern="[0-9]{11}" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Telefon *</n-label>
          <input type="tel" name="phone" value={phone} onChange={onChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>
    </>
  );
};


