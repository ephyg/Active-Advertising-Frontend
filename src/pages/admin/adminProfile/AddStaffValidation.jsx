import * as yup from "yup";
const ethiopianPhoneRegex = /^(\+251|251|0)?9[0-9]{8}$/;
const AddStaffValidation = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  address: yup.string().required("Address is required"),
  phone_number: yup
    .string()
    .matches(ethiopianPhoneRegex, {
      message: "Please enter valid phone number",
    })
    .required("Phone number is required"),
  user_password: yup.string().min(6, "please enter minimum 6 characters"),
  user_confirm: yup
    .string()
    .oneOf([yup.ref("user_password"), null], "Passwords must match"),
});
export default AddStaffValidation;
