import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useUserStore, { useUser } from "../store/userStore";

function PrivateRoutes() {
  const user = useUser();
  const navigate = useNavigate();

  return <Outlet />;
}

export default PrivateRoutes;
