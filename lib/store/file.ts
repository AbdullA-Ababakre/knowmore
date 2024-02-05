import { create } from "zustand";

interface UploadFileState {
  isUploaded: boolean;
  setIsUploaded: (isUploaded: boolean) => void;
}

export const useFileUploadStore = create<UploadFileState>((set) => ({
  isUploaded: false,
  setIsUploaded: (isUploaded: boolean) => set({ isUploaded }),
}));
