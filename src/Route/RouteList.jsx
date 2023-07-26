import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/common/login/Login";
import OrderList from "../pages/common/orderList/OrderList";
import Report from "../pages/admin/report/Report";

function RouteList() {
  return (
    <Routes>
      <Route path="/" Component={Login} />;
      <Route path="/report" Component={Report} />;
      <Route path="/" Component={Login} />;
    </Routes>
  );
}

export default RouteList;
