import React from "react";
import DesignerNavBar from "../../../components/designer/navBar/NavBar";
import Layout from "../../../components/Layout/Layout";
import useUserStore, { useUser, useUserData } from "../../../store/userStore";
import * as api from "../../../api/userApi";
import { useQuery } from "react-query";
import DesignerOrderComponent from "./DesignerOrderList";

function DesignerOrder() {
  const user = useUserStore();
  const userData = useUser();
  const {
    data: orderlist,
    isLoading,
    isError,
  } = useQuery("OrderList", () => api.staffOrderList(user.token, userData.id));
  if (isLoading) {
    return <h1></h1>;
  }
  return (
    <Layout>
      {orderlist && <DesignerOrderComponent orderlists={orderlist.data} />}
    </Layout>
  );
}
  
export default DesignerOrder;
