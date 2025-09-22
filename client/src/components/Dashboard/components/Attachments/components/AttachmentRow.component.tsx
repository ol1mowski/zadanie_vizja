import React from 'react';
import type { AttachmentResponse } from '../../../../../api/reservations';
import { FileIcon } from './FileIcon.component';

interface AttachmentRowProps {
  attachment: AttachmentResponse;
  onDownload: (attachment: AttachmentResponse) => void;
  onDelete?: (attachmentId: number) => void;
  canDelete: boolean;
  formatFileSize: (bytes: number) => string;
}

export const AttachmentRow: React.FC<AttachmentRowProps> = ({
  attachment,
  onDownload,
  onDelete,
  canDelete,
  formatFileSize,
}) => {
  return (
    <div
      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
    >
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <FileIcon contentType={attachment.contentType} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {attachment.originalFileName}
          </p>
          <p className="text-xs text-gray-500">
            {formatFileSize(attachment.fileSize)}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onDownload(attachment)}
          className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
          title="Pobierz plik"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </button>
        {canDelete && (
          <button
            onClick={() => onDelete?.(attachment.id)}
            className="p-1 text-red-600 hover:text-red-800 transition-colors"
            title="Usuń plik"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
