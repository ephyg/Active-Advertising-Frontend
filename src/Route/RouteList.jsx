import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/common/AuthPage/Login";
import Forgot from "../pages/common/AuthPage/Forgot";
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
import AddProforma from "../pages/common/addProforma/AddProforma";
import Downloadable from "../pages/common/addProforma/downloadableProforma";
import CustomerDetails from "../pages/common/customerDetail/CustomerDetails";
import AdminProfile from "../pages/admin/adminProfile/AdminProfile";
import AddStaff from "../pages/admin/addStaff/AddStaff";
import useUserStore from "../store.js/store";
import AddItems from "../pages/common/inventoryRegistration/AddItems";
import AccountManagerProfile from "../pages/accountManager/accountManagerProfile/AccountManagerProfile";
import ConfirmCode from "../pages/common/AuthPage/ConfirmCode";
import NewPassword from "../pages/common/AuthPage/NewPassword";
// import ProformaDetail from "../pages/common/proformaDetail/ProformaDetail";
import DeliveryForm from "../pages/common/deliveryForm/DeliveryForm";
function RouteList() {

  const roleType = useUserStore((state) => state.user);
  return (
    <Routes>
      {roleType === "admin" && (
        <>
          <Route path="/account-manager" Component={AccountManagerList} />
          <Route path="/report" Component={Report} />
          <Route path="/admin/profile" Component={AdminProfile} />
          <Route path="/admin/add-staff" Component={AddStaff} />
        </>
      )}
      {roleType === "account-manager" && (
        <>
          <Route
            path="/account-manager/profile"
            Component={AccountManagerProfile}
          />
        </>
      )}
      {(roleType === "account-manager" || roleType === "admin") && (
        <>
          <Route path="/proforma" Component={ProformaList} />
          <Route path="/proforma/:id" Component={AddProforma} />
          <Route path="/proforma/add" Component={AddProforma} />
          <Route path="/proforma/download" Component={Downloadable} />
          <Route path="/order" Component={OrderList} />
          <Route path="/order/:id" Component={OrderDetail} />
          <Route path="/customer" Component={CustomerList} />
          <Route path="/customer/:id" Component={CustomerDetails} />
          <Route path="/freelancer" Component={FreelancerList} />
          <Route path="/designer" Component={DesignerList} />
          <Route path="/stock" Component={InventoryList} />
          <Route path="/stock/additem" Component={AddItems} />
          <Route path="/agreement" Component={AgreementForm} />
          <Route path="/delivery" Component={DeliveryForm} />
        </>
      )}

      <Route path="/login" Component={Login} />
      <Route path="/forgot" Component={Forgot} />
      <Route path="/verify" Component={ConfirmCode} />
      <Route path="/new-password" Component={NewPassword} />
      <Route path="/" Component={Login} />
    </Routes>
  );
}

export default RouteList;
