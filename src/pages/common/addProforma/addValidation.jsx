import * as yup from "yup";
const AddValidation = yup.object().shape({
  itemDescription: yup.string().required("Item description is required"),
  // size: yup.string().required("Size is required"),
  vendor: yup.string().required("Vendor is required"),
  quantity: yup
    .number()
    .typeError("Quantity must be a valid number")
    .integer("Quantity must be an integer")
    .required("Quantity is required"),
  unitPrice: yup
    .number()
    .typeError("Price must be a valid number")
    .required("Price is required")
    .positive("Price must be a positive number"),
  profitPrice: yup
    .number()
    .typeError("Profit must be a valid number")
    .required("Profit is required")
    .min(0, "Profit cannot be negative"),
});

export default AddValidation;
