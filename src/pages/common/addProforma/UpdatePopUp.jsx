import React, { useState } from "react";
import { TiDelete } from "react-icons/ti";
import InputField from "../../../components/common/inputField/InputField";
import Button from "../../../components/common/button/Button";
import { useFormik } from "formik";
import UpdateValidation from "./updateValidation";

function UpdatePopUp({ Open, id, data, onClick }) {
  const [itemDescription, setitemDescription] = useState(
    data[id]["itemDecription"]
  );
  const [size, setSize] = useState(data[id]["size"]);
  const [quantity, setQuantity] = useState(data[id]["quantity"]);
  const [vendor, setVendor] = useState(data[id]["vendor"]);
  const [price, setPrice] = useState(data[id]["price"]);
  const [totalPrice, setTotalPrice] = useState(data[id]["totalPrice"]);
  const [profitPrice, setProfitPrice] = useState(data[id]["profitPrice"]);

  const onSubmit = () => {
    const updatedData = {
      id: data[id]["id"],
      itemDecription: values.itemDescription,
      size: values.size,
      vendor: values.vendor,
      quantity: values.quantity,
      unitPrice: values.unitPrice,
      totalPrice: Number(values.quantity) * Number(values.unitPrice),
      profitPrice:
        Number(values.quantity) *
        Number(values.unitPrice) *
        (values.profitPrice / 100),
    };
    data[id] = updatedData;
    onClick(data);
    Open(false);
  };
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        itemDescription: data[id].itemDecription,
        size: data[id].size,
        vendor: data[id].vendor,
        quantity: data[id].quantity,
        unitPrice: data[id].unitPrice,
        totalPrice: data[id].totalPrice,
        profitPrice: (100 * data[id].profitPrice) / data[id].totalPrice,
      },
      validationSchema: UpdateValidation,
      onSubmit,
    });
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col bg-white px-10 shadow-2xl py-6 rounded-2xl md:px-2"
    >
      <div className="flex  items-start justify-between mb-5">
        <h1 className="text-blue font-roboto font-bold text-base">Add Order</h1>
        <TiDelete
          size={35}
          color="red"
          className="hover:scale-110 cursor-pointer"
          onClick={() => Open(false)}
        />
      </div>
      <div className="grid grid-cols-2 gap-3 justify-center items-center">
        <InputField
          label="Items Descritpion"
          className="py-1 md:h-8 md:text-sm"
          id="itemDescription"
          name="itemDescription"
          value={values.itemDescription}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            errors.itemDescription && touched.itemDescription
              ? errors.itemDescription
              : ""
          }
        />
        <InputField
          label="Size"
          id="size"
          name="size"
          className="py-1 md:h-8 md:text-sm"
          value={values.size}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.size && touched.size ? errors.size : ""}
        />
        <InputField
          label="Quantity"
          className="py-1 md:h-8 md:text-sm"
          id="quantity"
          name="quantity"
          value={values.quantity}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.quantity && touched.quantity ? errors.quantity : ""}
        />
        <InputField
          label="Price"
          className="py-1 md:h-8 md:text-sm"
          id="unitPrice"
          name="unitPrice"
          value={values.unitPrice}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.unitPrice && touched.unitPrice ? errors.unitPrice : ""}
        />
        <InputField
          label="Vendor"
          className="py-1 md:h-8 md:text-sm"
          id="vendor"
          name="vendor"
          value={values.vendor}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.vendor && touched.vendor ? errors.vendor : ""}
        />
        <InputField
          label="Profit Percentage"
          className="py-1 md:h-8 md:text-sm"
          id="profitPrice"
          name="profitPrice"
          value={values.profitPrice}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            errors.profitPrice && touched.profitPrice ? errors.profitPrice : ""
          }
        />
      </div>
      <div className="w-full justify-center items-center mt-3">
        <Button
          type="submit"
          onClick={handleSubmit}
          text="Update Order"
          className="bg-blue text-white py-1 px-3 rounded-md hover:bg-blue_hover"
        />
      </div>
    </form>
  );
}

export default UpdatePopUp;
