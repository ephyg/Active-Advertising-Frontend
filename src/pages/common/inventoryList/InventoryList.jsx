import React from "react";
import Layout from "../../../components/Layout/Layout";
import * as api from "../../../api/stockApi";
import { useQuery } from "react-query";
import OrderListComponent from "./InventoryListComponent";
import Loading from "../../../assets/image/Loading.gif";
import useUserStore from "../../../store/userStore";
function InventoryList() {
  const user = useUserStore();
  const {
    data: inventoryList,
    isLoading,
    isError,
    isFetching,
  } = useQuery("inventoryList", () => api.GetAllItems(user.token), {
    refetchOnWindowFocus: true,
    // staleTime: Infinity,
    // forceFetch: true,
  });
  if (isLoading) {
    return (
      <div className="flex bg-transparent h-screen w-full justify-center items-center">
        <img src={Loading} className="w-24 " alt="Loading..." />
      </div>
    );
  }

  return (
    <Layout>
      {inventoryList && <OrderListComponent inventoryLists={inventoryList} />}
    </Layout>
  );
}

export default InventoryList;
