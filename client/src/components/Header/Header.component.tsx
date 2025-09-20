import { useState, useEffect } from 'react';                                                            import { MenuIcon, CloseIcon, UserIcon, CalendarIcon, LogOutIcon, SettingsIcon } from '../icons';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const isAuthenticated = false;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.mobile-menu') && !target.closest('.user-menu')) {
        setIsMobileMenuOpen(false);
        setIsUserMenuOpen(false);
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
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <CalendarIcon className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-xl font-bold text-gray-900 hidden sm:block">
                Portal Rezerwacji Wizyt
              </h1>
              <h1 className="ml-2 text-lg font-bold text-gray-900 sm:hidden">
                PRW
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative user-menu">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-all duration-200 transform hover:scale-105"
                >
                  <UserIcon className="h-5 w-5" />
                  <span className="hidden sm:block text-sm font-medium">
                    Jan Kowalski
                  </span>
                  <span className="hidden sm:block text-xs text-gray-500">
                    (Student)
                  </span>
                </button>

                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 animate-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        Jan Kowalski
                      </p>
                      <p className="text-xs text-gray-500">jan.kowalski@example.com</p>
                      <p className="text-xs text-blue-600">
                        Student
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
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
                    >
                      <LogOutIcon className="h-4 w-4 mr-2" />
                      Wyloguj
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <a
                  href="/login"
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 transform hover:scale-105"
                >
                  Zaloguj
                </a>
                <a
                  href="/register"
                  className="bg-blue-600 hover:bg-blue-700 hover:shadow-lg text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                  Rejestracja
                </a>
              </div>
            )}

            <button
              onClick={toggleMobileMenu}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200 transform hover:scale-110 active:scale-95"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Otwórz menu główne</span>
              {isMobileMenuOpen ? (
                <CloseIcon className="block h-6 w-6 transition-transform duration-200 rotate-90" />
              ) : (
                <MenuIcon className="block h-6 w-6 transition-transform duration-200" />
              )}
            </button>

          </div>
        </div>
      </div>

      <div className={`md:hidden mobile-menu transition-all duration-300 ease-in-out overflow-hidden ${
        isMobileMenuOpen 
          ? 'max-h-96 opacity-100' 
          : 'max-h-0 opacity-0'
      }`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {isAuthenticated && (
              <>
                <div className="border-t border-gray-200 my-2"></div>
                <a
                  href="/profile"
                  className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 transform hover:scale-105"
                  onClick={closeMobileMenu}
                >
                  <SettingsIcon className="h-5 w-5 mr-2" />
                  Profil
                </a>
                <button
                  onClick={handleLogout}
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
                <a
                  href="/login"
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 transform hover:scale-105"
                  onClick={closeMobileMenu}
                >
                  Zaloguj
                </a>
                <a
                  href="/register"
                  className="bg-blue-600 hover:bg-blue-700 hover:shadow-lg text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
                  onClick={closeMobileMenu}
                >
                  Rejestracja
                </a>
              </>
            )}
            
        </div>
      </div>
    </header>
  );
};