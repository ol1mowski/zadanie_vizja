import React from 'react';

export const CandidateDashboard: React.FC = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Panel Kandydata
        </h1>
        <p className="text-gray-600">
          Zarezerwuj wizytę wypełniając formularz z danymi identyfikacyjnymi
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200 hover:shadow-lg transition duration-200 cursor-pointer">
          <div className="flex items-center mb-4">
            <div className="bg-blue-500 p-3 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-blue-900 ml-3">
              Zarezerwuj Wizytę
            </h3>
          </div>
          <p className="text-blue-700 text-sm mb-4">
            Wypełnij formularz rezerwacji z danymi identyfikacyjnymi
          </p>
          <div className="mb-4">
            <div className="text-xs text-blue-600 mb-2">Wymagane dane:</div>
            <ul className="text-xs text-blue-600 space-y-1">
              <li>• Imię i nazwisko</li>
              <li>• Adres email</li>
              <li>• Numer telefonu</li>
              <li>• Temat wizyty</li>
            </ul>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
            Rozpocznij Rezerwację
          </button>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200 hover:shadow-lg transition duration-200 cursor-pointer">
          <div className="flex items-center mb-4">
            <div className="bg-green-500 p-3 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-green-900 ml-3">
              Status Rezerwacji
            </h3>
          </div>
          <p className="text-green-700 text-sm mb-4">
            Sprawdź status swojej rezerwacji
          </p>
          <div className="mb-4">
            <div className="bg-green-200 text-green-800 px-3 py-2 rounded-lg text-sm font-medium">
              Brak aktywnych rezerwacji
            </div>
          </div>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
            Sprawdź Status
          </button>
        </div>
      </div>

      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start">
          <div className="bg-yellow-100 p-2 rounded-lg mr-4">
            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">
              Ważne informacje dla kandydatów
            </h3>
            <ul className="text-yellow-800 space-y-2 text-sm">
              <li>• Rezerwacja wizyty nie wymaga konta użytkownika</li>
              <li>• Wszystkie pola formularza są obowiązkowe</li>
              <li>• Po złożeniu rezerwacji otrzymasz potwierdzenie na email</li>
              <li>• Status rezerwacji możesz sprawdzić podając numer referencyjny</li>
              <li>• Wizyty są przypisywane przez pracowników biura</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Najbliższe dostępne terminy
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200 cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Poniedziałek</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Dostępne</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">15 stycznia</p>
            <p className="text-sm text-gray-600">10:00 - 11:00</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200 cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Wtorek</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Dostępne</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">16 stycznia</p>
            <p className="text-sm text-gray-600">14:00 - 15:00</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200 cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Środa</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Wolne</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">17 stycznia</p>
            <p className="text-sm text-gray-600">09:00 - 10:00</p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Potrzebujesz pomocy?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-lg mr-3">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Telefon</p>
              <p className="text-sm text-gray-600">+48 123 456 789</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-lg mr-3">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Email</p>
              <p className="text-sm text-gray-600">biuro@uczelnia.edu.pl</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
