import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";

function PrivateRouteAuth() {
  const { User, user_role, token, login } = useUserStore();

  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      user_role == "admin" ? navigate("/report") : navigate("/order");
    }
  });
  return <Outlet />;
}

export default PrivateRouteAuth;
