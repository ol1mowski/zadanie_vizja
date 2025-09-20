import React from 'react';
import { UserIcon, SettingsIcon, LogOutIcon } from '../../icons';
import type { User, MenuActions } from '../types/types';

interface UserMenuProps {
  user: User;
  isUserMenuOpen: boolean;
  actions: MenuActions;
}

export const UserMenu: React.FC<UserMenuProps> = ({ 
  user, 
  isUserMenuOpen, 
  actions 
}) => {
  return (
    <div className="relative user-menu">
      <button
        onClick={actions.toggleUserMenu}
        className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-all duration-200 transform hover:scale-105"
      >
        <UserIcon className="h-5 w-5" />
        <span className="hidden sm:block text-sm font-medium">
          {user.name}
        </span>
        <span className="hidden sm:block text-xs text-gray-500">
          ({user.role})
        </span>
      </button>

      {isUserMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">
              {user.name}
            </p>
            <p className="text-xs text-gray-500">{user.email}</p>
            <p className="text-xs text-blue-600">
              {user.role}
            </p>
          </div>
          <a
            href="/profile"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
          >
            <SettingsIcon className="h-4 w-4 mr-2" />
            Profil
          </a>
          <button
            onClick={actions.handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
          >
            <LogOutIcon className="h-4 w-4 mr-2" />
            Wyloguj
          </button>
        </div>
      )}
    </div>
  );
};
