import React from 'react';
import type { CandidateFormData } from '../CandidateFormPopup.types';
import { FormSection } from './FormSection.component';
import { FormField } from './FormField.component';
import { SUBJECT_OPTIONS } from '../CandidateFormPopup.constants';

interface VisitDetailsSectionProps {
  formData: CandidateFormData;
  errors: Partial<CandidateFormData>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const VisitDetailsSection: React.FC<VisitDetailsSectionProps> = ({
  formData,
  errors,
  handleInputChange
}) => (
  <FormSection title="Szczegóły Wizyty" bgColor="bg-green-50">
    <div className="space-y-4">
      <FormField
        label="Temat wizyty"
        name="subject"
        type="select"
        value={formData.subject}
        onChange={handleInputChange}
        error={errors.subject}
        options={SUBJECT_OPTIONS}
        required
      />
      <FormField
        label="Opis zgłoszenia"
        name="description"
        type="textarea"
        value={formData.description}
        onChange={handleInputChange}
        error={errors.description}
        placeholder="Opisz szczegółowo sprawę, którą chcesz omówić..."
        rows={3}
        required
      />
    </div>
  </FormSection>
);


