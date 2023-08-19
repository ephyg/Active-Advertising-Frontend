import axios from "axios";
import baseURL from "./baseURL";

export const GetRole = async () => {
  const getRole = await axios
    .get(`${baseURL}/role`)
    .then((response) => response.data);
  return getRole;
};
export const AddUser = async (data) => {
  const addUser = await axios
    .post(`${baseURL}/user`, data)
    .then((response) => response.data);
  return addUser;
};
