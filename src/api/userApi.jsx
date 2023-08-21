import axios from "axios";
import baseURL from "./baseURL";

export const LoginUser = async (Credential) => {
  const user = await axios
    .post(`${baseURL}/login`, Credential)
    .then((response) => response.data);
  return user;
};
