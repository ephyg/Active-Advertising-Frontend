import { create } from "zustand";
import { persist } from "zustand/middleware";

const useForgotStore = create(
  persist(
    (set) => ({
      user_email: {},
      verification: false,
      setUser_email: (email) => {
        const { user_email } = email;
        set({ user_email });
      },
      setVerification: (verify) =>
        set((state) => ({
          verification: verify,
        })),
    }),
    {
      name: "forgot-store",
      getStorage: () => localStorage,
    }
  )
);
export default useForgotStore;
