import { useCallback, useMemo, useState } from 'react';
import { reservationsApi } from '../../../../../api/reservations';

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

export const useCandidateReservationForm = (onSuccess: (data: CandidateFormData) => void) => {
  const [formData, setFormData] = useState<CandidateFormData>({
    firstName: '',
    lastName: '',
    pesel: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    topic: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const timeOptions = useMemo(() => {
    const times: string[] = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 17 && minute > 0) break;
        const t = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        times.push(t);
      }
    }
    return times;
  }, []);

  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const reservationRequest = {
        date: formData.date,
        time: formData.time,
        topic: formData.topic,
        description: formData.description,
        candidateFirstName: formData.firstName,
        candidateLastName: formData.lastName,
        candidatePesel: formData.pesel,
        candidateEmail: formData.email,
        candidatePhone: formData.phone
      };

      const reservation = await reservationsApi.createCandidateReservation(reservationRequest);

      if (selectedFiles.length > 0) {
        setUploadingFiles(true);
        for (const file of selectedFiles) {
          await reservationsApi.uploadAttachment(reservation.id, file);
        }
      }

      onSuccess(formData);
    } catch (err) {
      setError('Nie udało się utworzyć rezerwacji. Spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
      setUploadingFiles(false);
    }
  }, [formData, onSuccess, selectedFiles]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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

  return {
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
  } as const;
};


