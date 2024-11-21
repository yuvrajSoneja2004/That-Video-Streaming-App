import { create } from "zustand";

export const useGlobalState = create((set) => ({
  showSidebar: true,
  isVideoUploaded: false,
  setShowSidebar: (boolState: boolean) =>
    set(() => ({ showSidebar: boolState })),
  setIsVideoUploaded: (boolState: boolean) =>
    set(() => ({ isVideoUploaded: boolState }))
}));
