import React, { useMemo } from "react";
import * as api from "../../../api/proformaApi";
import Layout from "../../../components/Layout/Layout";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { Columns } from "./Columns";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import CustomerComponent from "./CustomerComponent";
import useUserStore from "../../../store/userStore";
import Loading from '../../../assets/image/Loading.gif'
function OrderList() {
  const user = useUserStore();
  const {
    data: allProforma,
    isLoading,
    isError,
    isFetching,
  } = useQuery("allProformas", () => api.GetAllProforma(user.token), {
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return  <div className="flex bg-transparent h-screen w-full justify-center items-center">
    <img src={Loading} className="w-24 " alt="Loading..." />
  </div>
  }
  return (
    <Layout>
      {allProforma && <CustomerComponent allProformas={allProforma} />}
    </Layout>
  );
}

export default OrderList;
