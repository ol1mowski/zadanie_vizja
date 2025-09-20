export interface CandidateFormData {
  firstName: string;
  lastName: string;
  pesel: string;
  email: string;
  phone: string;
  subject: string;
  description: string;
  preferredDate: string;
  preferredTime: string;
}

export interface CandidateFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CandidateFormData) => void;
}
