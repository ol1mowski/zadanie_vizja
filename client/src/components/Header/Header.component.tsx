import React from 'react';
import { Logo } from './components';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          <Logo />
        </div>
      </div>
    </header>
  );
};