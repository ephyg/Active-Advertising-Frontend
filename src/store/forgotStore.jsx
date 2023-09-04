import { create } from "zustand";
import { persist } from "zustand/middleware";

const useForgotStore = create(
  persist(
    (set) => ({
      user_email: null,
      verification: false,
      sentMessage: {},
      notification: 1,
      setUser_email: (email) => {
        const { user_email } = email;
        set({ user_email });
      },
      setSentMessage: (data) => {
        const { message } = data;
        set({ sentMessage: message });
      },
      setVerification: (data) => {
        const { verification } = data;
        set({ verification });
      },
      setNotification: (number) => {
        const { notification } = number;
        set({ notification });
      },
    }),
    {
      name: "forgot-store",
      getStorage: () => localStorage,
    }
  )
);
export default useForgotStore;
