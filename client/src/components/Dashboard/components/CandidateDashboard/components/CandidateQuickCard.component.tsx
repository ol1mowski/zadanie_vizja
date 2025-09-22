type Props = {
  onStart: () => void;
};

export const CandidateQuickCard: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="max-w-md mx-auto">
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
            <li>• PESEL</li>
            <li>• Adres email</li>
            <li>• Numer telefonu</li>
            <li>• Temat wizyty</li>
            <li>• Opis zgłoszenia</li>
          </ul>
        </div>
        <button 
          onClick={onStart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          Rozpocznij Rezerwację
        </button>
      </div>
    </div>
  );
};


