import React, { useState, useEffect } from 'react';
import { Logo, AuthButtons, UserMenu, MobileMenuButton, MobileMenu } from './components';
import { MOCK_USER } from './constants/constants';
import type { User, MenuState, MenuActions } from './types/types';

export const Header: React.FC = () => {
  const [menuState, setMenuState] = useState<MenuState>({
    isMobileMenuOpen: false,
    isUserMenuOpen: false
  });

  const isAuthenticated = false;
  const user: User | null = isAuthenticated ? MOCK_USER : null;

  const menuActions: MenuActions = {
    toggleMobileMenu: () => {
      setMenuState((prev: MenuState) => ({ ...prev, isMobileMenuOpen: !prev.isMobileMenuOpen }));
    },
    toggleUserMenu: () => {
      setMenuState((prev: MenuState) => ({ ...prev, isUserMenuOpen: !prev.isUserMenuOpen }));
    },
    closeMobileMenu: () => {
      setMenuState((prev: MenuState) => ({ ...prev, isMobileMenuOpen: false }));
    },
    handleLogout: () => {
      setMenuState({ isMobileMenuOpen: false, isUserMenuOpen: false });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.mobile-menu') && !target.closest('.user-menu')) {
        setMenuState({ isMobileMenuOpen: false, isUserMenuOpen: false });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />

          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <UserMenu 
                user={user}
                isUserMenuOpen={menuState.isUserMenuOpen}
                actions={menuActions}
              />
            ) : (
              <AuthButtons className="hidden md:flex" />
            )}

            <MobileMenuButton 
              isOpen={menuState.isMobileMenuOpen}
              onToggle={menuActions.toggleMobileMenu}
            />
          </div>
        </div>
      </div>

      <MobileMenu 
        isOpen={menuState.isMobileMenuOpen}
        isAuthenticated={isAuthenticated}
        user={user}
        actions={menuActions}
      />
    </header>
  );
};