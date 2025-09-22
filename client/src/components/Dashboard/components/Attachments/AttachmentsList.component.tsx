import React from 'react';
import { reservationsApi, type AttachmentResponse } from '../../../../api/reservations';
import { AttachmentRow } from './components/AttachmentRow.component';

interface AttachmentsListProps {
  attachments: AttachmentResponse[];
  onDelete?: (attachmentId: number) => void;
  canDelete?: boolean;
}

export const AttachmentsList: React.FC<AttachmentsListProps> = ({
  attachments,
  onDelete,
  canDelete = false
}) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDownload = async (attachment: AttachmentResponse) => {
    try {
      const blob = await reservationsApi.downloadAttachment(attachment.id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = attachment.originalFileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      alert('Nie udało się pobrać pliku');
    }
  };

  const handleDelete = async (attachmentId: number) => {
    if (!confirm('Czy na pewno chcesz usunąć ten załącznik?')) return;
    
    try {
      await reservationsApi.deleteAttachment(attachmentId);
      onDelete?.(attachmentId);
    } catch (error) {
      alert('Nie udało się usunąć pliku');
    }
  };

  if (attachments.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500 text-sm">
        Brak załączników
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {attachments.map((attachment) => (
        <AttachmentRow
          key={attachment.id}
          attachment={attachment}
          onDownload={handleDownload}
          onDelete={handleDelete}
          canDelete={canDelete}
          formatFileSize={formatFileSize}
        />
      ))}
    </div>
  );
};
