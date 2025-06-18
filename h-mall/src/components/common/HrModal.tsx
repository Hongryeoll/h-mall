// components/HrModal.tsx
'use client';

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
  Transition,
} from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

export type HrModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children?: ReactNode;
};

export default function HrModal({
  isOpen,
  onClose,
  title,
  description,
  children,
}: HrModalProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="fixed inset-0 z-50">
        <div className="flex items-center justify-center min-h-screen">
          <DialogPanel className="bg-white rounded-lg p-6 shadow-lg">
            <DialogTitle>{title}</DialogTitle>
            <Description>{description}</Description>
            {children}
            <button
              className="mt-4 px-4 py-2 bg-gray-200 rounded"
              onClick={onClose}
            >
              확인
            </button>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
}
