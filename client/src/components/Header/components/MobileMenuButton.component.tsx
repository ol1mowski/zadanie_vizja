import React from 'react';
import { MenuIcon, CloseIcon } from '../../icons';

interface MobileMenuButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ 
  isOpen, 
  onToggle 
}) => {
  return (
    <button
      onClick={onToggle}
      className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200 transform hover:scale-110 active:scale-95"
      aria-expanded={isOpen}
      aria-label={isOpen ? 'Zamknij menu' : 'Otwórz menu'}
    >
      <span className="sr-only">Otwórz menu główne</span>
      {isOpen ? (
        <CloseIcon className="block h-6 w-6 transition-transform duration-200 rotate-90" />
      ) : (
        <MenuIcon className="block h-6 w-6 transition-transform duration-200" />
      )}
    </button>
  );
};
