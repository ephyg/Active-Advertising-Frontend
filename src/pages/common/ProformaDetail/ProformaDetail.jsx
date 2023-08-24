import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as api from "../../../api/proformaApi";
import { useQuery } from "react-query";
import ProformaDetailComponent from "./ProformaDetailComponent";
import useProformaStore from "../../../store/proformaStore";
import useUserStore from "../../../store/userStore";

function ProformaDetail() {
  const { id } = useParams();
  const user = useUserStore();
  const setProformaDetail = useProformaStore(
    (state) => state.setProformaDetail
  );
  const {
    data: proformaDetail,
    isLoading,
    isError,
  } = useQuery("proformaDetail", () => api.GetProforma(user.token, id));
  if (isLoading) {
    return <h1> </h1>;
  }
  const order = proformaDetail.order;
  const proforma = proformaDetail.proforma;
  const data = {
    order: order,
    proforma: proforma,
  };
  setProformaDetail(data);
  return <ProformaDetailComponent eachOrder={order} eachProforma={proforma} />;
}
export default ProformaDetail;
