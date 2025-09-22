import { useState, useCallback } from 'react';
import { reservationsApi, type AttachmentResponse } from '../../../../../api/reservations';

export const useAttachmentUpload = (
  reservationId: number,
  onUploadSuccess: (attachment: AttachmentResponse) => void,
  disabled: boolean
) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = useCallback(async (file: File) => {
    if (uploading || disabled) return;

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
  }, [uploading, disabled, reservationId, onUploadSuccess]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      void handleFileSelect(file);
    }
    e.target.value = '';
  }, [handleFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      void handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  return {
    uploading,
    dragOver,
    handleFileInput,
    handleDrop,
    handleDragOver,
    handleDragLeave,
  } as const;
};
