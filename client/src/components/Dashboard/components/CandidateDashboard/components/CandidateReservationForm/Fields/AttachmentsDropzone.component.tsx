import React from 'react';

type Props = {
  files: File[];
  dragOver: boolean;
  onFileSelect: (files: FileList | null) => void;
  onFileRemove: (index: number) => void;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  formatFileSize: (bytes: number) => string;
};

export const AttachmentsDropzone: React.FC<Props> = ({ files, dragOver, onFileSelect, onFileRemove, onDrop, onDragOver, onDragLeave, formatFileSize }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Załączniki (opcjonalnie)</label>
      <div 
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
        }`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="text-sm text-gray-600 mb-2">
          Przeciągnij i upuść pliki lub{' '}
          <label className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium">
            wybierz z dysku
            <input type="file" multiple className="hidden" onChange={(e) => onFileSelect(e.target.files)} accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif" />
          </label>
        </p>
        <p className="text-xs text-gray-500">Maksymalny rozmiar pliku: 10MB</p>
      </div>
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium text-gray-700">Wybrane pliki:</p>
          {files.map((file, index) => (
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
              <button type="button" onClick={() => onFileRemove(index)} className="p-1 text-red-600 hover:text-red-800 transition-colors" title="Usuń plik">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


