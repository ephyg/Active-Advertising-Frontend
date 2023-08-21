import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";

function PrivateRoutes() {
  const { User, token, login } = useUserStore();

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });
  return <Outlet />;
}

export default PrivateRoutes;
