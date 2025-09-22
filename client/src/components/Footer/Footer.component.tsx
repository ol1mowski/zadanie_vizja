import React from 'react';
import { FooterLogo, FooterContact, FooterBottom } from './components';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <FooterLogo />
          <FooterContact />
        </div>
        <FooterBottom />
      </div>
    </footer>
  );
};
