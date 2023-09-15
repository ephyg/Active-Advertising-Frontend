import * as yup from "yup";

const ethiopianPhoneRegex = /^(\+251|251|0)?9[0-9]{8}$/;

const ProformavalidationSchema = yup.object().shape({
  payment_request_number: yup
    .string()
    .required("Payment request number is required"),
  client_name: yup.string().required("Client name is required"),
  client_phone_number: yup
    .string()
    .matches(ethiopianPhoneRegex, {
      message: "Please enter a valid Ethiopian phone number",
    })
    .required("Client phone number is required"),
  client_tin_number: yup.string().required("Client TIN number is required"),
  price_validity: yup.string().required("Price validity is required"),
  payment_method: yup.string().required("Payment method is required"),
});

export default ProformavalidationSchema;
