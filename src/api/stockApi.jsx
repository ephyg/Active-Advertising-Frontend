import axios from "axios";
import baseURL from "./baseURL";

export const AddItems = async (data) => {
  const addItems = await axios
    .post(`${baseURL}/stock/add`, data)
    .then((response) => response.data);
  return addItems;
};

export const GetAllItems = async () => {
  const getAllItems = await axios
    .get(`${baseURL}/stock`)
    .then((response) => response.data);
  return getAllItems;
};
