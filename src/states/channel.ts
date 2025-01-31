import { create } from "zustand";

interface ChannelState {
  isChannelInfoUpdated: boolean;
  setIsChannelInfoUpdated: (boolState: boolean) => void;
}
export const useChannelState = create<ChannelState>((set) => ({
  isChannelInfoUpdated: false,
  setIsChannelInfoUpdated: (boolState: boolean) =>
    set(() => ({ isChannelInfoUpdated: boolState })),
}));
