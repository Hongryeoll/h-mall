'use client';

import { createContext, useContext, ReactNode, useState } from 'react';
import HrModal, { HrModalProps } from '@/components/common/HrModal';

type ModalOptions = Omit<HrModalProps, 'isOpen' | 'onClose'>;

type ModalContextType = {
  showModal: (opts: ModalOptions) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used inside ModalProvider');
  return ctx;
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalOpts, setModalOpts] = useState<ModalOptions | null>(null);

  const showModal = (opts: ModalOptions) => setModalOpts(opts);
  const closeModal = () => setModalOpts(null);

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}

      <HrModal
        isOpen={!!modalOpts}
        onClose={closeModal}
        title={modalOpts?.title ?? ''}
        description={modalOpts?.description ?? ''}
      >
        {modalOpts?.children}
      </HrModal>
    </ModalContext.Provider>
  );
}
