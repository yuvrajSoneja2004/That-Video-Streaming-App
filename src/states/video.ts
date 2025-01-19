import { create } from "zustand";

export const useSingleVideoState = create((set) => ({
  watchedDurations: {},
  setWatchedDuration: (videoId: string, watchState: any) =>
    set((state) => ({
      watchedDurations: { ...state.watchedDurations, [videoId]: watchState },
    })),
  logWatchDurations: () => {
    console.log(
      "Watched Durations:",
      useSingleVideoState.getState().watchedDurations
    );
  },
  getSingleVideoDuration: (videoId: string) => {
    const videoState = useSingleVideoState.getState();
    return videoState.watchedDurations[videoId] || 0;
  },
}));
