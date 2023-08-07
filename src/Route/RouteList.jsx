import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/common/login/Login";
import OrderList from "../pages/common/orderList/OrderList";
import Report from "../pages/admin/report/Report";
import ProformaList from "../pages/common/proformaList/ProformaList";
import CustomerList from "../pages/common/customerList/CustomerList";
import AccountManagerList from "../pages/admin/accountManagerList/AccountManagerList";
import FreelancerList from "../pages/common/freelancerList/FreelancerList";
import DesignerList from "../pages/common/designerList/DesignerList";
import InventoryList from "../pages/common/inventoryList/InventoryList";
import NavBar from "../components/accountManager/navBar/NavBar";
import AgreementForm from "../pages/common/agreementForm/AgreementForm";
import OrderDetail from "../pages/common/orderDetail/OrderDetail";
import ProformaDetail from "../pages/common/proformaDetail/ProformaDetail";
import DeliveryForm from "../pages/common/deliveryForm/DeliveryForm";
function RouteList() {

  // const roleType = "account-manager";
  const roleType = "admin";

  return (
    <Routes>
      {roleType === "admin" && (
        <>
          <Route path="/account-manager" Component={AccountManagerList} />
          <Route path="/report" Component={Report} />
        </>
      )}
      {(roleType === "account-manager" || roleType === "admin") && (
        <>
          <Route path="/proforma" Component={ProformaList} />
          <Route path="/proforma/:id" Component={ProformaDetail} />
          <Route path="/order" Component={OrderList} />
          <Route path="/order/:id" Component={OrderDetail} />
          <Route path="/customer" Component={CustomerList} />
          <Route path="/freelancer" Component={FreelancerList} />
          <Route path="/designer" Component={DesignerList} />
          <Route path="/stock" Component={InventoryList} />
          <Route path="/agreement" Component={AgreementForm} />
          <Route path="/delivery" Component={DeliveryForm} />
        </>
      )}

      <Route path="/" Component={Login} />
    </Routes>
  );
}

export default RouteList;
