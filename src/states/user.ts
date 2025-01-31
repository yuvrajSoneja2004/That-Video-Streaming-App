import { create } from "zustand";

interface UserState {
  userInfo: any;
  setUserInfo: (userState: any) => void;
}
export const useUserStore = create<UserState>((set) => ({
  userInfo: {},
  setUserInfo: (userState: any) => set(() => ({ userInfo: userState })),
}));
