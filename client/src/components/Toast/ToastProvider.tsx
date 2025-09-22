import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export type Toast = {
  id: string;
  type: ToastType;
  message: string;
};

type ToastContextValue = {
  toasts: Toast[];
  showToast: (message: string, type?: ToastType) => void;
  dismissToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

const genId = (): string => Math.random().toString(36).slice(2) + Date.now().toString(36);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<Record<string, number>>({});

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
    const timer = timersRef.current[id];
    if (timer) {
      window.clearTimeout(timer);
      delete timersRef.current[id];
    }
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = genId();
    const toast: Toast = { id, type, message };
    setToasts(prev => [...prev, toast]);
    timersRef.current[id] = window.setTimeout(() => dismissToast(id), 3500);
  }, [dismissToast]);

  const value = useMemo<ToastContextValue>(() => ({ toasts, showToast, dismissToast }), [toasts, showToast, dismissToast]);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};
