import * as yup from "yup";
const NewPasswordValidation = yup.object().shape({
  password: yup
    .string()
    .min(6, "please enter minimum 6 characters")
    .required("password is required"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export default NewPasswordValidation;
