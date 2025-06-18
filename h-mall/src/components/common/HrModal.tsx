'use client';

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
  Transition,
  TransitionChild,
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
      <Dialog onClose={onClose} className="fixed inset-0 z-modal">
        <div className="fixed inset-0 bg-modal-overlay transition-opacity" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild as={Fragment}>
            <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-left shadow-xl transition-all font-pretendard space-y-4">
              <DialogTitle className="text-hr-h4 font-hr-bold text-hr-gray-90">
                {title}
              </DialogTitle>
              <Description className="text-hr-b2 text-hr-gray-60 leading-hr-body">
                {description}
              </Description>
              {children ? (
                <div>{children}</div>
              ) : (
                <div className="pt-4 text-right">
                  <button
                    onClick={onClose}
                    className="inline-flex items-center justify-center rounded-xl bg-hr-purple-default px-4 py-2 text-white text-hr-b3 font-hr-semi-bold hover:bg-hr-purple-hover transition-colors"
                  >
                    확인
                  </button>
                </div>
              )}
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
