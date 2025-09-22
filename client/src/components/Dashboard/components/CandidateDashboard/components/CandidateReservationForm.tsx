import React from 'react';
import { motion } from 'framer-motion';
import { useCandidateReservationForm } from './CandidateReservationForm/useCandidateReservationForm.hook';
import { PersonalInfoFields } from './CandidateReservationForm/Fields/PersonalInfoFields.component';
import { ContactFields } from './CandidateReservationForm/Fields/ContactFields.component';
import { VisitFields } from './CandidateReservationForm/Fields/VisitFields.component';
import { AttachmentsDropzone } from './CandidateReservationForm/Fields/AttachmentsDropzone.component';

interface CandidateReservationFormProps {
  onSuccess: (data: CandidateFormData) => void;
  onCancel: () => void;
}

export interface CandidateFormData {
  firstName: string;
  lastName: string;
  pesel: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  topic: string;
  description: string;
}

export const CandidateReservationForm: React.FC<CandidateReservationFormProps> = ({
  onSuccess,
  onCancel
}) => {
  const {
    formData,
    isSubmitting,
    error,
    selectedFiles,
    uploadingFiles,
    dragOver,
    timeOptions,
    today,
    handleSubmit,
    handleChange,
    handleFileSelect,
    handleFileRemove,
    formatFileSize,
    handleDrop,
    handleDragOver,
    handleDragLeave,
  } = useCandidateReservationForm(onSuccess);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Rezerwacja Wizyty - Kandydat</h2>
        <p className="text-gray-600">Wypełnij formularz, aby zarezerwować wizytę</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <PersonalInfoFields
          firstName={formData.firstName}
          lastName={formData.lastName}
          pesel={formData.pesel}
          phone={formData.phone}
          onChange={handleChange}
        />

        <ContactFields email={formData.email} onChange={handleChange as any} />

        <VisitFields
          date={formData.date}
          time={formData.time}
          topic={formData.topic}
          description={formData.description}
          timeOptions={timeOptions}
          minDate={today}
          onChange={handleChange as any}
        />

        <AttachmentsDropzone
          files={selectedFiles}
          dragOver={dragOver}
          onFileSelect={handleFileSelect}
          onFileRemove={handleFileRemove}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          formatFileSize={formatFileSize}
        />

        <div className="flex justify-end space-x-4 pt-4 border-t">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting || uploadingFiles}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            Anuluj
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting || uploadingFiles}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
          >
            {isSubmitting && !uploadingFiles && 'Tworzenie rezerwacji...'}
            {uploadingFiles && 'Przesyłanie plików...'}
            {!isSubmitting && !uploadingFiles && 'Utwórz Rezerwację'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};
