import { useEffect } from "react";
import * as api from "../api/userApi";
import { useQuery } from "react-query";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useNavigate } from "react-router-dom";
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
        set({ token: null, user: null, user_role: null });
      },
    }),
    {
      name: "user-store",
      getStorage: () => localStorage,
    }
  )
);
// export const useUserInformation = create((set) => ({
//   User: null,
//   setUser: (userData) => {
//     const { User } = userData;
//     set({ User });
//   },
// }));
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
    retry: false,
  });

  useEffect(() => {
    if (!isLoading && isError) {
      navigate("/login");
    }
  }, [isLoading, isError]);

  return authUserData;
};

export const useNoUser = () => {
  const { token } = useUserStore();
  const navigate = useNavigate();

  const {
    data: authUserData,
    isError,
    isLoading,
  } = useQuery("authUser", () => api.AuthenticatedUser(token), {
    retry: false,
  });

  useEffect(() => {
    if (token && !isLoading && !isError && authUserData) {
      authUserData.user_role == "admin"
        ? navigate("/report")
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
  } = useQuery("authUser", () => api.AuthenticatedUser(token), {
    retry: false,
  });
  if (isLoading) {
    return <h1>loading</h1>;
  }
  // user.setUser(authUserData)
  return authUserData;
};
export default useUserStore;
