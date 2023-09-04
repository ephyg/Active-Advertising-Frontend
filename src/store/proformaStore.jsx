import { create } from "zustand";
import { persist } from "zustand/middleware";
const useProformaStore = create(
  persist(
    (set) => ({
      allProforma: {},
      eachOrder: null,
      eachProforma: null,
      oToA: null,
      setOToA: (data) => {
        const { oToA } = data;
        set(oToA);
      },
      setAllProforma: (data) => {
        const { allProforma } = data;
        set(allProforma);
      },
      setProformaDetail: (data) => {
        const { order, proforma } = data;
        set({
          eachOrder: order,
          eachProforma: proforma,
        });
      },
    }),
    {
      name: "proforma-store",
      getStorage: () => localStorage,
    }
  )
);

export default useProformaStore;
