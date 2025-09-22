import React from 'react';
import type { CandidateFormData } from '../CandidateFormPopup.types';
import { FormSection } from './FormSection.component';
import { FormField } from './FormField.component';

interface ContactInfoSectionProps {
  formData: CandidateFormData;
  errors: Partial<CandidateFormData>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({
  formData,
  errors,
  handleInputChange
}) => (
  <FormSection title="Dane Kontaktowe" bgColor="bg-blue-50">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
        placeholder="example@email.com"
        required
      />
      <FormField
        label="Numer telefonu"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleInputChange}
        error={errors.phone}
        placeholder="+48 123 456 789"
        required
      />
    </div>
  </FormSection>
);


