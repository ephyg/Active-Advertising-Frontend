import axios from "axios";
import baseURL from "./baseURL";

export const LoginUser = async (Credential) => {
  const user = await axios
    .post(`${baseURL}/login`, Credential)
    .then((response) => response.data);
  return user;
};
export const AuthenticatedUser = async (token) => {
  const authUser = await axios
    .get(`${baseURL}/user/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return authUser;
};
