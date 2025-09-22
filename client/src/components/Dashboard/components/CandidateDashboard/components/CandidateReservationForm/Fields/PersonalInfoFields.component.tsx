import React from 'react';

type Props = {
  firstName: string;
  lastName: string;
  pesel: string;
  phone: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fieldErrors: Partial<Record<string, string>>;
};

export const PersonalInfoFields: React.FC<Props> = ({ firstName, lastName, pesel, phone, onChange, fieldErrors }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Imię *</label>
          <input 
            type="text" 
            name="firstName" 
            value={firstName} 
            onChange={onChange} 
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              fieldErrors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`} 
          />
          {fieldErrors.firstName && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.firstName}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nazwisko *</label>
          <input 
            type="text" 
            name="lastName" 
            value={lastName} 
            onChange={onChange} 
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              fieldErrors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`} 
          />
          {fieldErrors.lastName && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.lastName}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">PESEL *</label>
          <input 
            type="text" 
            name="pesel" 
            value={pesel} 
            onChange={onChange} 
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              fieldErrors.pesel ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`} 
          />
          {fieldErrors.pesel && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.pesel}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Telefon *</label>
          <input 
            type="tel" 
            name="phone" 
            value={phone} 
            onChange={onChange} 
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              fieldErrors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`} 
          />
          {fieldErrors.phone && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.phone}</p>
          )}
        </div>
      </div>
    </>
  );
};


