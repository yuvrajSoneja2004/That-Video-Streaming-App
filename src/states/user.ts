import { create } from "zustand";

export const useUserStore = create((set) => ({
  userInfo: {},
  setUserInfo: (userState: any) => set(() => ({ userInfo: userState })),
}));
