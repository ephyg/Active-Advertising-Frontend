import axios from "axios";
import baseURL from "./baseURL";

export const GetRole = async (token) => {
  const getRole = await axios
    .get(`${baseURL}/role`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return getRole;
};
export const AddUser = async (token, data) => {
  const addUser = await axios
    .post(`${baseURL}/user`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return addUser;
};
export const UpdateUser = async (token, id, data) => {
  const updateUser = await axios
    .put(`${baseURL}/user/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return updateUser;
};
export const CheckUser = async (token, email) => {
  const user_email = await axios
    .post(`${baseURL}/forgot`, email)
    .then((response) => response.data);
  return user_email;
};
