import { useState } from 'react';
import type { CandidateFormData } from './CandidateFormPopup.types';

export const useCandidateForm = () => {
  const [formData, setFormData] = useState<CandidateFormData>({
    firstName: '',
    lastName: '',
    pesel: '',
    email: '',
    phone: '',
    subject: '',
    description: '',
    preferredDate: '',
    preferredTime: ''
  });

  const [errors, setErrors] = useState<Partial<CandidateFormData>>({});

  const validatePesel = (pesel: string): boolean => {
    if (pesel.length !== 11) return false;
    if (!/^\d{11}$/.test(pesel)) return false;
    
    const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    let sum = 0;
    
    for (let i = 0; i < 10; i++) {
      sum += parseInt(pesel[i]) * weights[i];
    }
    
    const checkDigit = (10 - (sum % 10)) % 10;
    return checkDigit === parseInt(pesel[10]);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CandidateFormData> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'Imię jest wymagane';
    if (!formData.lastName.trim()) newErrors.lastName = 'Nazwisko jest wymagane';
    if (!formData.pesel.trim()) {
      newErrors.pesel = 'PESEL jest wymagany';
    } else if (!validatePesel(formData.pesel)) {
      newErrors.pesel = 'Nieprawidłowy format PESEL';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email jest wymagany';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Nieprawidłowy format email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Numer telefonu jest wymagany';
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = 'Nieprawidłowy format numeru telefonu';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Temat wizyty jest wymagany';
    if (!formData.description.trim()) newErrors.description = 'Opis zgłoszenia jest wymagany';
    if (!formData.preferredDate) newErrors.preferredDate = 'Preferowana data jest wymagana';
    if (!formData.preferredTime) newErrors.preferredTime = 'Preferowana godzina jest wymagana';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: CandidateFormData) => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof CandidateFormData]) {
      setErrors((prev: Partial<CandidateFormData>) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent, onSubmit: (data: CandidateFormData) => void, onClose: () => void) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      pesel: '',
      email: '',
      phone: '',
      subject: '',
      description: '',
      preferredDate: '',
      preferredTime: ''
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    handleInputChange,
    handleSubmit,
    resetForm
  };
};
