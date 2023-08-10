import * as yup from "yup";
const ConfirmCodeValidation = yup.object().shape({
  reset_code: yup
    .number()
    .integer("verify code must be a whole number")
    .min(1000, "verify code must be exactly four digits")
    .max(9999, "verify code must be exactly four digits")
    .required("verify code is required"),
});

export default ConfirmCodeValidation;
