import * as yup from "yup";
const ForgotValidation = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("email is required"),
});
export default ForgotValidation;
