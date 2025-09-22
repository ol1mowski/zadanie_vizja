import { useCallback, useState } from 'react';

export type CandidateReservationData = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  preferredDate: string;
  preferredTime: string;
};

export const useCandidateDashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState<boolean>(false);
  const [reservationData, setReservationData] = useState<CandidateReservationData | null>(null);

  const openForm = useCallback(() => setIsFormOpen(true), []);
  const closeForm = useCallback(() => setIsFormOpen(false), []);

  const handleFormSubmit = useCallback((data: CandidateReservationData) => {
    setReservationData({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      subject: data.subject,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
    });
    setShowSuccessScreen(true);
    setIsFormOpen(false);
  }, []);

  return {
    isFormOpen,
    showSuccessScreen,
    reservationData,
    openForm,
    closeForm,
    handleFormSubmit,
  } as const;
};


