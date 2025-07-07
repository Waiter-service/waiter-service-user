'use client';

import React, { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';

import { Dialog } from './dialog-provider.types';

interface DialogContext {
  type: Dialog | null;
  data?: any;
  open: (type: Dialog, data?: any) => void;
  close: () => void;
}

const DialogContext = createContext<DialogContext | undefined>(undefined);

interface DialogProviderProps {
  children: ReactNode;
}

const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
  const [type, setType] = useState<Dialog | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (type) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [type]);

  const open = useCallback((type: Dialog, data?: any) => {
    setType(type);
    setData(data);
  }, []);

  const close = useCallback(() => {
    setType(null);
    setData(null);
  }, []);

  return <DialogContext.Provider value={{ type, data, open, close }}>{children}</DialogContext.Provider>;
};

export default DialogProvider;

export const useDialogContext = (): DialogContext => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialogContext must be used within a DialogProvider');
  }
  return context;
};
