import React from 'react';
import type { CandidateFormData } from '../CandidateFormPopup.types';
import { FormSection } from './FormSection.component';
import { FormField } from './FormField.component';
import { TIME_OPTIONS } from '../CandidateFormPopup.constants';

interface PreferredTimeSectionProps {
  formData: CandidateFormData;
  errors: Partial<CandidateFormData>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const PreferredTimeSection: React.FC<PreferredTimeSectionProps> = ({
  formData,
  errors,
  handleInputChange
}) => (
  <FormSection title="Preferowany Termin" bgColor="bg-purple-50">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        label="Preferowana data"
        name="preferredDate"
        type="date"
        value={formData.preferredDate}
        onChange={handleInputChange}
        error={errors.preferredDate}
        min={new Date().toISOString().split('T')[0]}
        required
      />
      <FormField
        label="Preferowana godzina"
        name="preferredTime"
        type="select"
        value={formData.preferredTime}
        onChange={handleInputChange}
        error={errors.preferredTime}
        options={TIME_OPTIONS}
        required
      />
    </div>
  </FormSection>
);


