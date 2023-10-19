import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useUserStore, { useNoUser, useUser } from "../store/userStore";

function PrivateRouteAuth() {
  
  const user = useNoUser();
  return <Outlet />;
}

export default PrivateRouteAuth;
