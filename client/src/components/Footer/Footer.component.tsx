import React from 'react';
import { FooterLogo, FooterNavigation, FooterContact, FooterBottom } from './components';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FooterLogo />
          <FooterNavigation />
          <FooterContact />
        </div>
        <FooterBottom />
      </div>
    </footer>
  );
};
