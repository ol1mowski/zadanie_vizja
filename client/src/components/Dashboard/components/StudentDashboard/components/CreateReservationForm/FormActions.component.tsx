import React from 'react';

type Props = {
  onCancel: () => void;
  submitting: boolean;
  uploading: boolean;
};

export const FormActions: React.FC<Props> = ({ onCancel, submitting, uploading }) => {
  return (
    <div className="flex justify-end space-x-4 pt-4 border-t">
      <button
        type="button"
        onClick={onCancel}
        disabled={submitting || uploading}
        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
      >
        Anuluj
      </button>
      <button
        type="submit"
        disabled={submitting || uploading}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
      >
        {submitting && !uploading && 'Tworzenie rezerwacji...'}
        {uploading && 'Przesyłanie plików...'}
        {!submitting && !uploading && 'Utwórz Rezerwację'}
      </button>
    </div>
  );
};


