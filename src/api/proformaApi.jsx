import axios from "axios";
import baseURL from "./baseURL";

export const AddProforma = async (token, data) => {
  const addProforma = await axios
    .post(`${baseURL}/proforma/add`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return addProforma;
};
export const GetAllProforma = async (token) => {
  const getAllProforma = await axios
    .get(`${baseURL}/proforma`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return getAllProforma;
};
export const GetProforma = async (token, id) => {
  const getProforma = await axios
    .get(`${baseURL}/proforma/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return getProforma;
};
export const GetProformaBasicInfo = async (token) => {
  const getProformaBasicInfo = await axios
    .get(`${baseURL}/basic_info`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return getProformaBasicInfo;
};

export const GetOrder = async (token) => {
  const getOrder = await axios
    .get(`${baseURL}/order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return getOrder;
};
export const UpdateStatus = async (token, id, data) => {
  const updateStatus = await axios
    .put(`${baseURL}/proforma/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return updateStatus;
};
export const OrderedEmployee = async (token, id) => {
  const orderEmployee = await axios
    .get(`${baseURL}/order/employer/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return orderEmployee;
};
export const UpdateOrder = async (token, data) => {
  const updateStatus = await axios
    .put(`${baseURL}/orderStaff`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return updateStatus;
};
export const UpdateOrderFreelancer = async (token, data) => {
  const updateStatus = await axios
    .put(`${baseURL}/orderFreelancer`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return updateStatus;
};