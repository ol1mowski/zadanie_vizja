import React from 'react';
import type { CandidateFormData } from '../CandidateFormPopup.types';
import { FormSection } from './FormSection.component';
import { FormField } from './FormField.component';

interface PersonalInfoSectionProps {
  formData: CandidateFormData;
  errors: Partial<CandidateFormData>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  formData,
  errors,
  handleInputChange
}) => (
  <FormSection title="Dane Osobowe">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        label="Imię"
        name="firstName"
        value={formData.firstName}
        onChange={handleInputChange}
        error={errors.firstName}
        placeholder="Wprowadź imię"
        required
      />
      <FormField
        label="Nazwisko"
        name="lastName"
        value={formData.lastName}
        onChange={handleInputChange}
        error={errors.lastName}
        placeholder="Wprowadź nazwisko"
        required
      />
    </div>
    <div className="mt-4">
      <FormField
        label="PESEL"
        name="pesel"
        value={formData.pesel}
        onChange={handleInputChange}
        error={errors.pesel}
        placeholder="Wprowadź PESEL (11 cyfr)"
        maxLength={11}
        required
      />
    </div>
  </FormSection>
);


