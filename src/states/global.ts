import { create } from "zustand";

export const useGlobalState = create((set) => ({
  showSidebar: true,
  isVideoUploaded: false,
  loadingBarState: 30,
  setShowSidebar: (boolState: boolean) =>
    set(() => ({ showSidebar: boolState })),
  setIsVideoUploaded: (boolState: boolean) =>
    set(() => ({ isVideoUploaded: boolState })),
  setLoadingBarState: (progress: number) =>
    set(() => ({ loadingBarState: progress })),
}));
