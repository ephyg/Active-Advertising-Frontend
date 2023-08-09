import axios from "axios";
import baseURL from "./baseURL";

export const ForgotPassword = async (email) => {
  const user_email = await axios
    .post(`${baseURL}/forgot`, email)
    .then((response) => response.data);
  return user_email;
};

export const VerifyCode = async (code) => {
  const reset_code = await axios
    .post(`${baseURL}/verify`, code)
    .then((response) => response.data);
};
