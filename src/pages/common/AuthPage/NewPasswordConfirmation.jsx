import * as yup from "yup";
const NewPasswordValidation = yup.object().shape({
  user_password: yup
    .string()
    .min(6, "please enter minimum 6 characters")
    .required("password is required"),
  user_confirm: yup
    .string()
    .oneOf([yup.ref("user_password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export default NewPasswordValidation;
