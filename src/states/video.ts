import { create } from "zustand";

interface VideoState {
  watchedDurations: any;
  currentVideoCategory: string;
  setCurrentVideoCategory: (category: string) => void;
  setWatchedDuration: (videoId: string, watchState: any) => void;
  logWatchDurations: () => void;
  getSingleVideoDuration: (videoId: string) => number;
}
export const useSingleVideoState = create<VideoState>((set) => ({
  watchedDurations: {},
  currentVideoCategory: "all",
  setCurrentVideoCategory: (category: string) =>
    set({ currentVideoCategory: category }),
  setWatchedDuration: (videoId: string, watchState: any) =>
    set((state) => ({
      watchedDurations: { ...state.watchedDurations, [videoId]: watchState },
    })),
  logWatchDurations: () => {
    // console.log(
    //   "Watched Durations:",
    //   useSingleVideoState.getState().watchedDurations
    // );
  },
  getSingleVideoDuration: (videoId: string) => {
    const videoState: VideoState = useSingleVideoState.getState();
    return videoState.watchedDurations[videoId] || 0;
  },
}));
