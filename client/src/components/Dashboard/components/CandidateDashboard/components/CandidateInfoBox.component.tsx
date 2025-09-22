export const CandidateInfoBox: React.FC = () => {
  return (
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
            <li>• PESEL musi być prawidłowy (11 cyfr z poprawną sumą kontrolną)</li>
            <li>• Po złożeniu rezerwacji otrzymasz potwierdzenie na email</li>
            <li>• Status rezerwacji możesz sprawdzić podając numer referencyjny</li>
            <li>• Wizyty są przypisywane przez pracowników biura</li>
          </ul>
        </div>
      </div>
    </div>
  );
};


