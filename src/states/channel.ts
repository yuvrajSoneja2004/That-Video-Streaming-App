import { create } from "zustand";

export const useChannelState = create((set) => ({
  isChannelInfoUpdated: false,
  setIsChannelInfoUpdated: (boolState: boolean) =>
    set(() => ({ isChannelInfoUpdated: boolState })),
}));
