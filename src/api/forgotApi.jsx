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
    .post(`${baseURL}/verifyCode`, code)
    .then((response) => response.data);
  return reset_code;
};
export const NewPassword = async (password) => {
  const newPassword = await axios
    .post(`${baseURL}/changePassword`, password)
    .then((response) => response.data);
  return newPassword;
};
