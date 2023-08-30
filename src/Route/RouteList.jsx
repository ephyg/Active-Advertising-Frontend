import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import AgreementForm from "../pages/common/agreementForm/AgreementForm";
import OrderDetail from "../pages/common/orderDetail/OrderDetail";
import AddProforma from "../pages/common/addProforma/AddProforma";
import CustomerDetails from "../pages/common/customerDetail/CustomerDetails";
import AdminProfile from "../pages/admin/adminProfile/AdminProfile";
import AddStaff from "../pages/admin/addStaff/AddStaff";
import useUserStore from "../store/userStore";
import AddItems from "../pages/common/inventoryRegistration/AddItems";
import AccountManagerProfile from "../pages/accountManager/accountManagerProfile/AccountManagerProfile";
import ConfirmCode from "../pages/common/AuthPage/ConfirmCode";
import NewPassword from "../pages/common/AuthPage/NewPassword";
import DeliveryForm from "../pages/common/deliveryForm/DeliveryForm";
import PrivateRoutes from "./PrivateRoutes";
import PrivateRouteAuth from "./PrivateRouteAuth";
import ProformaDetail from "../pages/common/ProformaDetail/ProformaDetail";
import EditItems from "../pages/common/inventoryRegistration/EditItems";
import AddFreelancer from "../pages/common/freelancerRegistration/AddFreelancer";
import { useQuery } from "react-query";
import * as api from "../api/userApi";
import StaffList from "../pages/admin/staffList/StaffList";
import StaffDetail from "../pages/admin/staffList/StaffDetail";

function RouteList() {
  const user = useUserStore();
  const navigate = useNavigate();
  // const roleType = useUserStore((state) => state.user_role);
  // const {
  //   data: authUserData,
  //   isError,
  //   isLoading,
  // } = useQuery("authUser", () => api.AuthenticatedUser(user.token));

  // if (isLoading) {
  //   return <h1>Loading sidebar....</h1>;
  // }
  // if (isError) {
  //   navigate("/login");
  //   return
  // }

  // const roleType = authUserData.user_role;
  const roleType = "admin";
  return (
    <Routes>
      <Route element={<PrivateRouteAuth />}>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/verify" element={<ConfirmCode />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/" element={<Login />} />
      </Route>

      <Route element={<PrivateRoutes />}>
        {/* Route for admin only */}
        {roleType == "admin" && (
          <>
            <Route path="/account-manager" element={<AccountManagerList />} />
            <Route path="/report" element={<Report />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
            <Route path="/admin/add-staff" element={<AddStaff />} />
            <Route path="/admin/staffs" element={<StaffList />} />
            <Route path="/admin/staffs/:id" element={<StaffDetail />} />
          </>
        )}
        {/* Route for account manager only*/}
        {roleType == "account-manager" && (
          <>
            <Route
              path="/account-manager/profile"
              element={<AccountManagerProfile />}
            />
          </>
        )}
        {/* Route common for admin and account manager only*/}
        {(roleType == "account-manager" || roleType == "admin") && (
          <>
            <Route path="/order" element={<OrderList />} />
            <Route path="/proforma" element={<ProformaList />} />
            <Route path="/proforma/:id" element={<ProformaDetail />} />
            <Route path="/proforma/add" element={<AddProforma />} />
            <Route path="/order/:id" element={<OrderDetail />} />
            <Route path="/customer" element={<CustomerList />} />
            <Route path="/customer/:id" element={<CustomerDetails />} />
            <Route path="/freelancer" element={<FreelancerList />} />
            <Route path="/addfreelancer" element={<AddFreelancer />} />
            <Route path="/designer" element={<DesignerList />} />
            <Route path="/stock" element={<InventoryList />} />
            <Route path="/stock/:id" element={<EditItems />} />
            <Route path="/stock/additem" element={<AddItems />} />
            <Route path="/agreement" element={<AgreementForm />} />
            <Route path="/delivery" element={<DeliveryForm />} />
          </>
        )}
        {/* Route for employees only*/}
        {roleType !== "account-manager" && roleType !== "admin" && (
          <>
            {/* <Route path="/order" element={<OrderList />} /> */}
            <Route path="/order/:id" element={<OrderDetail />} />
          </>
        )}
      </Route>
    </Routes>
  );
}

export default RouteList;
