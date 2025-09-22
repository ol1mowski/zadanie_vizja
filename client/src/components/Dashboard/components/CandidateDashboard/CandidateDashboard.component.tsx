import { useUser } from '../../../../contexts/UserContext';
import { CandidateReservationForm } from './components/CandidateReservationForm';
import { CandidateSuccessScreen } from '../Shared/CandidateSuccessScreen.component';
import { useCandidateDashboard } from './hooks/useCandidateDashboard.hook';
import { CandidateQuickCard } from './components/CandidateQuickCard.component';
import { CandidateInfoBox } from './components/CandidateInfoBox.component';
import { CandidateHelpBox } from './components/CandidateHelpBox.component';

export const CandidateDashboard: React.FC = () => {
  const { logout } = useUser();
  const { isFormOpen, showSuccessScreen, reservationData, openForm, closeForm, handleFormSubmit } = useCandidateDashboard();

  if (showSuccessScreen && reservationData) {
    return <CandidateSuccessScreen reservationData={reservationData} />;
  }

  if (isFormOpen) {
    return (
      <CandidateReservationForm
        onSuccess={(data) => handleFormSubmit({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          subject: data.topic,
          preferredDate: data.date,
          preferredTime: data.time,
        })}
        onCancel={closeForm}
      />
    );
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Panel Kandydata
          </h1>
          <p className="text-gray-600">
            Zarezerwuj wizytę wypełniając formularz z danymi identyfikacyjnymi
          </p>
        </div>
        <button 
          onClick={logout}
          className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          Powrót
        </button>
      </div>

      <CandidateQuickCard onStart={openForm} />

      <CandidateInfoBox />

      <CandidateHelpBox />

    </div>
  );
};
