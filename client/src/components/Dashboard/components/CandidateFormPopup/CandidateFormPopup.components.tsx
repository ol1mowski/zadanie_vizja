import React from 'react';
import { motion } from 'framer-motion';
import type { CandidateFormData } from './CandidateFormPopup.types';
import { SUBJECT_OPTIONS, TIME_OPTIONS } from './CandidateFormPopup.constants';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  bgColor?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({ 
  title, 
  children, 
  bgColor = 'bg-gray-50' 
}) => (
  <div className={`${bgColor} p-4 rounded-lg`}>
    <h3 className="text-lg font-semibold text-gray-900 mb-4">
      {title}
    </h3>
    {children}
  </div>
);

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  min?: string;
  rows?: number;
  options?: { value: string; label: string }[];
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  maxLength,
  min,
  rows,
  options
}) => {
  const inputClasses = `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
    error ? 'border-red-500' : 'border-gray-300'
  }`;

  const renderInput = () => {
    if (type === 'textarea') {
      return (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          className={inputClasses}
          placeholder={placeholder}
        />
      );
    }

    if (type === 'select') {
      return (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={inputClasses}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={inputClasses}
        placeholder={placeholder}
        maxLength={maxLength}
        min={min}
      />
    );
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && '*'}
      </label>
      {renderInput()}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

interface FormHeaderProps {
  onClose: () => void;
}

export const FormHeader: React.FC<FormHeaderProps> = ({ onClose }) => (
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold text-gray-900">
      Rezerwacja Wizyty - Kandydat
    </h2>
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClose}
      className="text-gray-400 hover:text-gray-600 transition-colors"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </motion.button>
  </div>
);

interface FormButtonsProps {
  onClose: () => void;
}

export const FormButtons: React.FC<FormButtonsProps> = ({ onClose }) => (
  <div className="flex justify-end space-x-4 pt-4 border-t">
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClose}
      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
    >
      Anuluj
    </motion.button>
    <motion.button
      type="submit"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Zarezerwuj Wizytę
    </motion.button>
  </div>
);

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
