import React from 'react';
import { CalendarIcon } from '../icons';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <CalendarIcon className="h-8 w-8 text-blue-400" />
              <h3 className="ml-2 text-xl font-bold">Portal Rezerwacji Wizyt</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Internetowy system rezerwacji wizyt dla studentów, kandydatów i pracowników. 
              Zarządzaj swoimi spotkaniami w prosty i intuicyjny sposób.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-400">Nawigacja</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/" 
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  Strona główna
                </a>
              </li>
              <li>
                <a 
                  href="/reservation" 
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  Rezerwacja wizyty
                </a>
              </li>
              <li>
                <a 
                  href="/my-appointments" 
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  Moje wizyty
                </a>
              </li>
              <li>
                <a 
                  href="/employee-dashboard" 
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  Panel pracownika
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-400">Kontakt</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-medium">Email:</span> kontakt@portal-rezerwacji.pl
              </p>
              <p>
                <span className="font-medium">Telefon:</span> +48 123 456 789
              </p>
              <p>
                <span className="font-medium">Adres:</span><br />
                ul. Akademicka 1<br />
                00-001 Warszawa
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} Portal Rezerwacji Wizyt. Wszystkie prawa zastrzeżone.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a 
                href="/privacy" 
                className="text-gray-500 hover:text-gray-900 text-sm transition-colors duration-200"
              >
                Polityka prywatności
              </a>
              <a 
                href="/terms" 
                className="text-gray-500 hover:text-gray-900 text-sm transition-colors duration-200"
              >
                Regulamin
              </a>
              <a 
                href="/help" 
                className="text-gray-500 hover:text-gray-900 text-sm transition-colors duration-200"
              >
                Pomoc
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
