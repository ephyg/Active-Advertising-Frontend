import React from "react";
import Layout from "../../../components/Layout/Layout";
import * as api from "../../../api/proformaApi";
import { useQuery } from "react-query";
import OrderListComponent from "./OrderListComponent";
import useUserStore from "../../../store/userStore";
function OrderList() {
  const user = useUserStore();
  const {
    data: orderlist,
    isLoading,
    isError,
    isFetching,
  } = useQuery("OrderList", () => api.GetOrder(user.token), {
  });

  if (isLoading) {
    return <h1></h1>;
  }
  return (
    <Layout>
      {orderlist && <OrderListComponent orderlists={orderlist.data} />}
    </Layout>
  );
}

export default OrderList;
