import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { reservationsApi } from '../../../../api/reservations';

interface CandidateReservationFormProps {
  onSuccess: (data: CandidateFormData) => void;
  onCancel: () => void;
}

interface CandidateFormData {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Create reservation
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
      
      // Upload attachments if any
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
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (files: FileList | null) => {
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
  };

  const handleFileRemove = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  // Generate time options (9:00 - 17:00, every 30 minutes)
  const timeOptions = [];
  for (let hour = 9; hour <= 17; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 17 && minute > 0) break;
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeOptions.push(timeString);
    }
  }

  const today = new Date().toISOString().split('T')[0];

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
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imię *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nazwisko *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PESEL *
            </label>
            <input
              type="text"
              name="pesel"
              value={formData.pesel}
              onChange={handleChange}
              pattern="[0-9]{11}"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telefon *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Visit Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data wizyty *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={today}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Godzina wizyty *
            </label>
            <select
              name="time"
              value={formData.time}
              onChange={(e) => handleChange(e as any)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Wybierz godzinę</option>
              {timeOptions.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Temat wizyty *
          </label>
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            required
            maxLength={500}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Opis wizyty *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            maxLength={2000}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
        </div>

        {/* Attachments */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Załączniki (opcjonalnie)
          </label>
          
          <div 
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragOver 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-sm text-gray-600 mb-2">
              Przeciągnij i upuść pliki lub{' '}
              <label className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium">
                wybierz z dysku
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFileSelect(e.target.files)}
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                />
              </label>
            </p>
            <p className="text-xs text-gray-500">
              Maksymalny rozmiar pliku: 10MB
            </p>
          </div>

          {selectedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium text-gray-700">Wybrane pliki:</p>
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleFileRemove(index)}
                    className="p-1 text-red-600 hover:text-red-800 transition-colors"
                    title="Usuń plik"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

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
