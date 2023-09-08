import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as api from "../../../api/proformaApi";
import { useQuery } from "react-query";
import ProformaDetailComponent from "./ProformaDetailComponent";
import useProformaStore from "../../../store/proformaStore";
import useUserStore from "../../../store/userStore";
import Loading from '../../../assets/image/Loading.gif'

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
    return  <div className="flex bg-transparent h-screen w-full justify-center items-center">
    <img src={Loading} className="w-24 " alt="Loading..." />
  </div>
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
