import axios from "axios";
import baseURL from "./baseURL";

export const AddItems = async (token, data) => {
  const addItems = await axios
    .post(`${baseURL}/stock/add`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return addItems;
};
export const EditItem = async (token, id, data) => {
  const editItems = await axios
    .put(`${baseURL}/stock/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => console.log(response, data));
  return editItems;
};
export const GetAllItems = async (token) => {
  const getAllItems = await axios
    .get(`${baseURL}/stock`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return getAllItems;
};
export const DeleteItems = async (token, id) => {
  const deleteItems = await axios
    .delete(`${baseURL}/stock/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return deleteItems;
};
