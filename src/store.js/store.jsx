import { create } from "zustand";
const useUserStore = create((set) => ({
  user: "admin",
  // user:"account-manager",
  setUser: (state) => set(user),
  clearUser: (state) => set({ user: null }),
}));

export default useUserStore;
