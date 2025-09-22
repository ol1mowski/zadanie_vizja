import React from 'react';
import { useToast } from './ToastProvider';

const typeStyles: Record<string, string> = {
  success: 'bg-green-600',
  error: 'bg-red-600',
  info: 'bg-blue-600',
  warning: 'bg-yellow-600',
};

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-[1000] space-y-2">
      {toasts.map(t => (
        <div key={t.id} className={`text-white shadow-lg rounded-md px-4 py-3 flex items-start ${typeStyles[t.type]} max-w-sm`}>
          <div className="flex-1 pr-3 text-sm">{t.message}</div>
          <button onClick={() => dismissToast(t.id)} className="opacity-80 hover:opacity-100">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};
