import { useCallback, useMemo, useState } from 'react';
import { reservationsApi } from '../../../../../../api/reservations';

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
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof CandidateFormData, string>>>({});

  const isValidPesel = useCallback((value: string): boolean => {
    if (!/^\d{11}$/.test(value)) return false;
    const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    const digits = value.split('').map(d => parseInt(d, 10));
    const sum = weights.reduce((acc, w, i) => acc + w * digits[i], 0);
    const control = (10 - (sum % 10)) % 10;
    return control === digits[10];
  }, []);

  const isValidEmail = useCallback((value: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }, []);

  const isValidPhone = useCallback((value: string): boolean => {
    return /^\+?\d{9,15}$/.test(value);
  }, []);

  const validateField = useCallback((field: keyof CandidateFormData, value: string): string | null => {
    const trimmedValue = value.trim();
    
    if (!trimmedValue) {
      return 'To pole jest wymagane.';
    }

    switch (field) {
      case 'pesel':
        return !isValidPesel(trimmedValue) ? 'Nieprawidłowy numer PESEL (musi mieć 11 cyfr i poprawną sumę kontrolną).' : null;
      case 'email':
        return !isValidEmail(trimmedValue) ? 'Nieprawidłowy adres e-mail.' : null;
      case 'phone':
        return !isValidPhone(trimmedValue) ? 'Nieprawidłowy numer telefonu (dozwolone 9-15 cyfr, opcjonalnie +).' : null;
      case 'topic':
        return trimmedValue.length < 3 ? 'Temat wizyty powinien mieć co najmniej 3 znaki.' : null;
      case 'description':
        return trimmedValue.length < 10 ? 'Opis wizyty powinien mieć co najmniej 10 znaków.' : null;
      case 'date':
      case 'time':
        if (formData.date && formData.time) {
          const candidateDateTime = new Date(`${formData.date}T${formData.time}:00`);
          const now = new Date();
          if (isNaN(candidateDateTime.getTime()) || candidateDateTime <= now) {
            return 'Data i godzina wizyty muszą być w przyszłości.';
          }
        }
        return null;
      default:
        return null;
    }
  }, [formData.date, formData.time, isValidEmail, isValidPesel, isValidPhone]);

  const validate = useCallback((): string | null => {
    const required: Array<keyof CandidateFormData> = ['firstName','lastName','pesel','email','phone','date','time','topic','description'];
    const errors: Partial<Record<keyof CandidateFormData, string>> = {};
    
    for (const key of required) {
      const error = validateField(key, formData[key] || '');
      if (error) {
        errors[key] = error;
      }
    }

    setFieldErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      return 'Proszę poprawić błędy w formularzu.';
    }
    
    return null;
  }, [formData, validateField]);

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
      const validationError = validate();
      if (validationError) {
        setError(validationError);
        return;
      }
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
  }, [formData, onSuccess, selectedFiles, validate]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Walidacja w czasie rzeczywistym
    const fieldName = name as keyof CandidateFormData;
    const error = validateField(fieldName, value);
    setFieldErrors(prev => ({
      ...prev,
      [fieldName]: error || undefined
    }));
  }, [validateField]);

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
    fieldErrors,
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


