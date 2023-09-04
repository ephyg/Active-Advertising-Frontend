import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import * as api from "../../../api/proformaApi";
import { useQuery } from "react-query";
import ProformaComponent from "./ProformaComponent";
import useUserStore from "../../../store/userStore";
function ProformaList() {
  const user = useUserStore()
  const {
    data: allProforma,
    isLoading,
    isError,
    isFetching,
  } = useQuery("allProformas", () => api.GetAllProforma(user.token), {
    refetchOnWindowFocus: true,
  });
  if (isLoading) {
    return <h1></h1>;
  }
  return (
    <Layout>
      {allProforma && <ProformaComponent allProformas={allProforma} />}
    </Layout>
  );
}

export default ProformaList;
