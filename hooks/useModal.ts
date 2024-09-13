import { Server } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "create-server"
  | "invite-link"
  | "delete"
  | "update-server"
  | "manage-server"
  | "create-channel"
  | "update-channel"
  | "delete-channel"
  | null;

interface ModalData {
  server?: Server;
  channelType?: any;
  channel?: any;
}

interface ModalProps {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalProps>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type: ModalType, data = {}) =>
    set({ isOpen: true, type: type, data }),
  onClose: () => set({ isOpen: false, type: null }),
}));
