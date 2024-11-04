import { create } from "zustand";

export const useUserStore = create((set) => ({
  userInfo: {},
  setUserInfo: (userState: any) => set(() => ({ userInfo: userState })),
  // removeAllBears: () => set({ bears: 0 }),
  // updateBears: (newBears) => set({ bears: newBears }),
}));
