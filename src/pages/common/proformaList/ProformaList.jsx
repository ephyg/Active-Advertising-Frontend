import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import * as api from "../../../api/proformaApi";
import { useQuery } from "react-query";
import ProformaComponent from "./ProformaComponent";
import useUserStore from "../../../store/userStore";
import Loading from "../../../assets/image/Loading.gif";
function ProformaList() {
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
    return (
      <div className="flex bg-transparent h-screen w-full justify-center items-center">
        <img src={Loading} className="w-24 " alt="Loading..." />
      </div>
    );
  }
  return (
    <Layout>
      {allProforma && <ProformaComponent allProformas={allProforma} />}
    </Layout>
  );
}

export default ProformaList;
