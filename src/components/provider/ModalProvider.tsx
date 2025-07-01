'use client';

import { ReactNode } from 'react';
import HrModal from '@/components/common/HrModal';
import { useModalStore } from '@/store/modal/useModalStore';

export default function ModalProvider({ children }: { children: ReactNode }) {
  const { isOpen, closeModal, modalOpts } = useModalStore();

  return (
    <>
      {children}

      <HrModal
        isOpen={isOpen}
        onClose={closeModal}
        title={modalOpts?.title ?? ''}
        description={modalOpts?.description ?? ''}
      >
        {modalOpts?.children}
      </HrModal>
    </>
  );
}
