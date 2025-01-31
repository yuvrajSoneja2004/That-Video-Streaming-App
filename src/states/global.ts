import { create } from "zustand";

interface GlobalState {
  showSidebar: boolean;
  isVideoUploaded: boolean;
  loadingBarState: number;
  setShowSidebar: (boolState: boolean) => void;
  setIsVideoUploaded: (boolState: boolean) => void;
  setLoadingBarState: (progress: number) => void;
}

export const useGlobalState = create<GlobalState>((set) => ({
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
