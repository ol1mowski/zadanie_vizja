import { useCallback, useMemo, useState } from 'react';
import { reservationsApi, type CreateReservationRequest, type ReservationResponse } from '../../../../../../../api/reservations';

type UseCreateReservationFormArgs = {
  onSuccess: () => void;
};

export const useCreateReservationForm = ({ onSuccess }: UseCreateReservationFormArgs) => {
  const [formData, setFormData] = useState<CreateReservationRequest>({
    date: '',
    time: '',
    topic: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<boolean>(false);
  const [dragOver, setDragOver] = useState(false);

  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  const timeOptions = useMemo(() => {
    const options: string[] = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 17 && minute > 0) break;
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(timeString);
      }
    }
    return options;
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return;
    const validFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > 10 * 1024 * 1024) {
        alert(`Plik "${file.name}" jest za duży. Maksymalny rozmiar to 10MB.`);
        continue;
      }
      if (selectedFiles.some(f => f.name === file.name && f.size === file.size)) {
        continue;
      }
      validFiles.push(file);
    }
    setSelectedFiles(prev => [...prev, ...validFiles]);
  }, [selectedFiles]);

  const handleFileRemove = useCallback((index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const reservation: ReservationResponse = await reservationsApi.createStudentReservation(formData);
      if (selectedFiles.length > 0) {
        setUploadingFiles(true);
        for (const file of selectedFiles) {
          await reservationsApi.uploadAttachment(reservation.id, file);
        }
      }
      onSuccess();
    } catch (err) {
      setError('Nie udało się utworzyć rezerwacji. Spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
      setUploadingFiles(false);
    }
  }, [formData, onSuccess, selectedFiles]);

  return {
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
  } as const;
};


