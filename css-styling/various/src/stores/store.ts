import { create } from 'zustand';

type GlobalNavOpenState = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const useGlobalNavOpenState = create<GlobalNavOpenState>(set => ({
  isOpen: false,
  setIsOpen: isOpen => set({ isOpen }),
}));
