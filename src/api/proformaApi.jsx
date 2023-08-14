import axios from "axios";
import baseURL from "./baseURL";

export const AddProforma = async (data) => {
  const addProforma = await axios
    .post(`${baseURL}/proforma`, data)
    .then((response) => response.data);
  return user_email;
};
export const GetAllProforma = async () => {
  const getAllProforma = await axios
    .get(`${baseURL}/proforma`)
    .then((response) => response.data);
  return getAllProforma;
};
export const GetProforma = async (id) => {
  const getProforma = await axios
    .get(`${baseURL}/proforma/${id}`)
    .then((response) => response.data);
  return getProforma;
};
