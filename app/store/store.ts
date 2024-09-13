import { create } from "zustand";

type ModalType = "create-server" | null;

export const useStore = create((set) => ({
  modal: {
    type: null,
  },

  //   increasePopulation: () => set((state: any) => ({ bears: state.bears + 1 })),
  //   removeAllBears: () => set({ bears: 0 }),
  //   updateBears: (newBears: any) => set({ bears: newBears }),
}));
