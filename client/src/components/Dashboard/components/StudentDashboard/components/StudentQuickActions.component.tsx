type Props = {
  onCreate: () => void;
  onOpenReservations: () => void;
};

export const StudentQuickActions: React.FC<Props> = ({ onCreate, onOpenReservations }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200 hover:shadow-lg transition duration-200 cursor-pointer">
        <div className="flex items-center mb-4">
          <div className="bg-blue-500 p-3 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-blue-900 ml-3">
            Zarezerwuj Wizytę
          </h3>
        </div>
        <p className="text-blue-700 text-sm mb-4">
          Wybierz termin i zarezerwuj wizytę z pracownikiem biura
        </p>
        <button 
          onClick={onCreate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          Rozpocznij Rezerwację
        </button>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200 hover:shadow-lg transition duration-200 cursor-pointer">
        <div className="flex items-center mb-4">
          <div className="bg-green-500 p-3 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-green-900 ml-3">
            Moje Wizyty
          </h3>
        </div>
        <p className="text-green-700 text-sm mb-4">
          Przeglądaj i zarządzaj swoimi zarezerwowanymi wizytami
        </p>
        <button 
          onClick={onOpenReservations}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          Zobacz Wizyty
        </button>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200 hover:shadow-lg transition duration-200 cursor-pointer">
        <div className="flex items-center mb-4">
          <div className="bg-purple-500 p-3 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-purple-900 ml-3">
            Historia Wizyt
          </h3>
        </div>
        <p className="text-purple-700 text-sm mb-4">
          Przeglądaj historię swoich zakończonych wizyt
        </p>
        <button 
          onClick={onOpenReservations}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          Zobacz Historię
        </button>
      </div>
    </div>
  );
};


