import React from 'react';

interface ContactInfo {
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
  };
}

const contactInfo: ContactInfo = {
  email: 'kontakt@portal-rezerwacji.pl',
  phone: '+48 123 456 789',
  address: {
    street: 'ul. Akademicka 1',
    city: '00-001 Warszawa'
  }
};

export const FooterContact: React.FC = () => {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-blue-400">Kontakt</h4>
      <div className="space-y-2 text-sm text-gray-600">
        <p>
          <span className="font-medium">Email:</span> {contactInfo.email}
        </p>
        <p>
          <span className="font-medium">Telefon:</span> {contactInfo.phone}
        </p>
        <p>
          <span className="font-medium">Adres:</span><br />
          {contactInfo.address.street}<br />
          {contactInfo.address.city}
        </p>
      </div>
    </div>
  );
};
