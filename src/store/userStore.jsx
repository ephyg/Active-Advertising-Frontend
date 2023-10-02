import { useEffect } from "react";
import * as api from "../api/userApi";
import { useQuery, useQueryClient } from "react-query";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useNavigate } from "react-router-dom";
import useProformaStore from "./proformaStore";
const useUserStore = create(
  persist(
    (set) => ({
      // user_role: {},
      // user: localStorage.getItem("user"),
      token: localStorage.getItem("token") || null,
      number: null,
      setNumber: (x) => {
        const number = x;
        set({ number });
      },
      login: (userData) => {
        const { token } = userData;
        set({ token });
      },
      logout: () => {
        // localStorage.clear();
        set({
          token: null,
        });
        //   user: null,
        //   user_role: null,
        //   useProformaStore: null,
        //   eachProforma: null,
        // });
      },
    }),
    {
      name: "user-store",
      getStorage: () => localStorage,
    }
  )
);

export const useUser = () => {
  const { token } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  const {
    data: authUserData,
    isError,
    isLoading,
  } = useQuery("authUser", () => api.AuthenticatedUser(token), {
    retry: 0,
  });

  useEffect(() => {
    if (!isLoading && isError) {
      navigate("/login");
    }
  }, [isLoading, isError]);
  if (isLoading) {
    return <h1>loading</h1>;
  }
  return authUserData;
};

export const useNoUser = () => {
  const { token } = useUserStore();
  const navigate = useNavigate();
  const userQuery = useQueryClient();
  const {
    data: authUserData,
    isError,
    isLoading,
  } = useQuery(["authUser", token], () => api.AuthenticatedUser(token), {
    retry: 0,
  });

  useEffect(() => {
    if (token && !isLoading && !isError && authUserData) {
      // userQuery.invalidateQueries({ queryKey: ["authUser"] });
      authUserData.user_role == "admin"
        ? navigate("/report")
        : authUserData.user_role == "account-manager"
        ? navigate("/proforma")
        : navigate("/order");
    }
  }, [isLoading, isError, token, authUserData]);

  return authUserData;
};

export const useUserData = () => {
  const { token } = useUserStore();
  const navigate = useNavigate();
  // const user=useUserInformation()

  const {
    data: authUserData,
    isError,
    isLoading,
  } = useQuery(["authUser", token], () => api.AuthenticatedUser(token), {
    retry: 0,
  });
  if (isLoading) {
    return <h1>loading</h1>;
  }
  // user.setUser(authUserData)

  return authUserData;
};
export default useUserStore;
