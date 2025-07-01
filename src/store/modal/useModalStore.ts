import { create } from 'zustand';

export type ModalOptions = {
  title: string;
  description: string | React.ReactNode;
  children?: React.ReactNode;
};

type ModalStore = {
  isOpen: boolean;
  modalOpts: ModalOptions | null;
  showModal: (opts: ModalOptions) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  modalOpts: null,
  showModal: (opts) =>
    set({
      isOpen: true,
      modalOpts: opts,
    }),
  closeModal: () =>
    set({
      isOpen: false,
      modalOpts: null,
    }),
}));
