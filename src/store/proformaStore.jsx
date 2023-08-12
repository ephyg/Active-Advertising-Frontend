import { create } from "zustand";
import { persist } from "zustand/middleware";
const useProformaStore = create(
  persist(
    (set) => ({
      allProforma: null,
      proformaDetail: null,
      eachOrder: null,
      eachProforma: null,
      setAllProforma: (allProforma) => {
        set(allProforma);
      },
      setProformaDetail: (data) => {
        const { proforma, order } = data;
        set({ eachOrder: order, eachProforma: proforma });
      },
    }),
    {
      name: "proforma-store",
      getStorage: () => localStorage,
    }
  )
);

export default useProformaStore;
