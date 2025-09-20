import React from 'react';
import { SettingsIcon, LogOutIcon } from '../../icons';
import type { User, MenuActions } from '../types/types';
import { MOBILE_MENU_MAX_HEIGHT, MOBILE_MENU_MIN_HEIGHT } from '../constants/constants';

interface MobileMenuProps {
  isOpen: boolean;
  isAuthenticated: boolean;
  user: User | null;
  actions: MenuActions;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  isAuthenticated, 
  user, 
  actions 
}) => {
  return (
    <div className={`md:hidden mobile-menu transition-all duration-300 ease-in-out overflow-hidden ${
      isOpen 
        ? `${MOBILE_MENU_MAX_HEIGHT} opacity-100` 
        : `${MOBILE_MENU_MIN_HEIGHT} opacity-0`
    }`}>
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
        {isAuthenticated && user && (
          <>
            <div className="border-t border-gray-200 my-2"></div>
            <a
              href="/profile"
              className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 transform hover:scale-105"
              onClick={actions.closeMobileMenu}
            >
              <SettingsIcon className="h-5 w-5 mr-2" />
              Profil
            </a>
            <button
              onClick={actions.handleLogout}
              className="flex items-center w-full text-gray-700 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 transform hover:scale-105"
            >
              <LogOutIcon className="h-5 w-5 mr-2" />
              Wyloguj
            </button>
          </>
        )}
        
        {!isAuthenticated && (
          <>
            <div className="border-t border-gray-200 my-2"></div>
            <div className="space-y-1">
              <a
                href="/login"
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 transform hover:scale-105"
                onClick={actions.closeMobileMenu}
              >
                Zaloguj
              </a>
              <a
                href="/register"
                className="bg-blue-600 hover:bg-blue-700 hover:shadow-lg text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
                onClick={actions.closeMobileMenu}
              >
                Rejestracja
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
