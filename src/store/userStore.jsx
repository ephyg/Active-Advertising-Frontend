import { create } from "zustand";
import { persist } from "zustand/middleware";
const useUserStore = create(
  persist(
    (set) => ({
      user_role: {},
      User: localStorage.getItem("User"),
      // setUserRole: (newRole) => set((state) => ({ user_role: newRole })),
      // setUser: (newUser) => set((state) => ({ ...state, User: newUser })),
      // clearUser: (state) => set({ user: null }),

      token: localStorage.getItem("token") || null,

      login: (userData) => {
        const { token, user } = userData;
        set({ token, user, user_role: user["user_role"] });
      },
      logout: () => {
        set({ token: null, user: null, user_role: null });
      },
    }),
    {
      name: "user-store",
      getStorage: () => localStorage,
    }
  )
);

export default useUserStore;
