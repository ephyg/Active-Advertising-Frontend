import { create } from "zustand";
import { persist } from "zustand/middleware";
const stockStore = create(
  persist(
    (set) => ({
      eachItem: null,
      setProformaDetail: (data) => {
        const { eachItem } = data;

        set({
          eachItem,
        });
      },
    }),
    {
      name: "stock-store",
      getStorage: () => localStorage,
    }
  )
);

export default stockStore;
