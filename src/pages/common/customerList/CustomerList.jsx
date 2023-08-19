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
import CustomerComponent from "./CustomerComponent"
function OrderList() {
  const {
    data: allProforma,
    isLoading,
    isError,
    isFetching,
  } = useQuery("allProformas", api.GetAllProforma, {
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <h1></h1>;
  }
  return (
    <Layout>
     {allProforma && <CustomerComponent allProformas={allProforma} />}
    </Layout>
  );
}

export default OrderList;
