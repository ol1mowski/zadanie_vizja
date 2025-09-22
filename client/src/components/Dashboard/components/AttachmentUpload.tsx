import React, { useState } from 'react';
import { reservationsApi, type AttachmentResponse } from '../../../api/reservations';

interface AttachmentUploadProps {
  reservationId: number;
  onUploadSuccess: (attachment: AttachmentResponse) => void;
  disabled?: boolean;
}

export const AttachmentUpload: React.FC<AttachmentUploadProps> = ({
  reservationId,
  onUploadSuccess,
  disabled = false
}) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = async (file: File) => {
    if (uploading || disabled) return;

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      alert('Plik jest za duży. Maksymalny rozmiar to 10MB.');
      return;
    }

    setUploading(true);
    try {
      const attachment = await reservationsApi.uploadAttachment(reservationId, file);
      onUploadSuccess(attachment);
    } catch (error) {
      alert('Nie udało się przesłać pliku. Spróbuj ponownie.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
    // Reset input
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  if (disabled) {
    return null;
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
        dragOver
          ? 'border-blue-500 bg-blue-50'
          : uploading
          ? 'border-gray-300 bg-gray-50'
          : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {uploading ? (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
          <p className="text-sm text-gray-600">Przesyłanie pliku...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-sm text-gray-600 mb-2">
            Przeciągnij i upuść plik lub{' '}
            <label className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium">
              wybierz z dysku
              <input
                type="file"
                className="hidden"
                onChange={handleFileInput}
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
              />
            </label>
          </p>
          <p className="text-xs text-gray-500">
            Maksymalny rozmiar: 10MB
          </p>
        </div>
      )}
    </div>
  );
};
