import React from "react";
import Layout from "../../../components/Layout/Layout";
import * as api from "../../../api/stockApi";
import { useQuery } from "react-query";
import OrderListComponent from "./InventoryListComponent";
import useUserStore from "../../../store/userStore";
function InventoryList() {
  const user=useUserStore()
  const {
    data: inventoryList,
    isLoading,
    isError,
    isFetching,
  } = useQuery("inventoryList",()=> api.GetAllItems(user.token), {
    refetchOnWindowFocus: true,
    // staleTime: Infinity,
    // forceFetch: true,
  });
  // console.log(orderlist);
  if (isLoading) {
    return <h1></h1>;
  }
  console.log(inventoryList);

  return (
    <Layout>
      {inventoryList && <OrderListComponent inventoryLists={inventoryList} />}
    </Layout>
  );
}

export default InventoryList;
