import React, { useMemo } from "react";
import Layout from "../../../components/Layout/Layout";
import * as api from "../../../api/proformaApi";
import { useQuery } from "react-query";
import OrderListComponent from "./OrderListComponent";
function OrderList() {
  const {
    data: orderlist,
    isLoading,
    isError,
    isFetching,
  } = useQuery("OrderList", api.GetOrder, {
    refetchOnWindowFocus: true,
  });
  // console.log(orderlist);1
  if (isLoading) {
    return <h1></h1>;
  }
  return (
    <Layout>
      {orderlist && <OrderListComponent orderlists={orderlist} />}
    </Layout>
  );
}

export default OrderList;
