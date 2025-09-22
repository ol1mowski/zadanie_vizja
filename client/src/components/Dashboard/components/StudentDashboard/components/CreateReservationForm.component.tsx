import { motion } from 'framer-motion';
import { DateTimeFields } from './CreateReservationForm/DateTimeFields.component';
import { TopicDescriptionFields } from './CreateReservationForm/TopicDescriptionFields.component';
import { AttachmentsDropzone } from './CreateReservationForm/AttachmentsDropzone.component';
import { FormActions } from './CreateReservationForm/FormActions.component';
import { useCreateReservationForm } from './CreateReservationForm/hooks/useCreateReservationForm.hook';

interface CreateReservationFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const CreateReservationForm: React.FC<CreateReservationFormProps> = ({ onSuccess, onCancel }) => {
  const {
    formData,
    isSubmitting,
    error,
    selectedFiles,
    uploadingFiles,
    dragOver,
    today,
    timeOptions,
    handleSubmit,
    handleChange,
    handleFileSelect,
    handleFileRemove,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    formatFileSize,
  } = useCreateReservationForm({ onSuccess });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Nowa Rezerwacja</h2>
        <p className="text-gray-600">Wypełnij formularz, aby zarezerwować wizytę</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <DateTimeFields
          date={formData.date}
          time={formData.time}
          onChange={handleChange}
          timeOptions={timeOptions}
          minDate={today}
        />

        <TopicDescriptionFields
          topic={formData.topic}
          description={formData.description}
          onChange={handleChange}
        />

        <AttachmentsDropzone
          files={selectedFiles}
          onFileSelect={handleFileSelect}
          onFileRemove={handleFileRemove}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          dragOver={dragOver}
          formatFileSize={formatFileSize}
        />

        <FormActions
          onCancel={onCancel}
          submitting={isSubmitting}
          uploading={uploadingFiles}
        />
      </form>
    </motion.div>
  );
};
