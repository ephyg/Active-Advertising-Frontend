import React from "react";
import Layout from "../../../components/Layout/Layout";
import InputField from "../../../components/common/inputField/InputField";
import Button from "../../../components/common/button/Button";
import { useFormik } from "formik";
import * as api from "../../../api/stockApi";
import AddItemValidation from "./AddItemValidation";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import stockStore from "../../../store/stockStore";
import { ToastContainer, toast } from "react-toastify";
import useUserStore from "../../../store/userStore";
function EditItems() {
  const queryClient = useQueryClient();
  const { setProformaDetail, eachItem } = stockStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useUserStore();
  const addItem = async (data) => {
    const response = await api.EditItem(user.token, data.id, data.ItemData);
    return response;
  };
  const deleteItem = async (data) => {
    const response = await api.DeleteItems(user.token, data);
    return response;
  };
  const updateMutation = useMutation(addItem, {
    onSuccess: (response) => {
      toast.success("Item Updated Successfully", {
        position: "top-center",
        toastId: "successUser",
      });
      navigate("/stock");
      queryClient.invalidateQueries(["inventoryList"]);
      navigate("/stock");
    },
  });
  const deleteMutation = useMutation(deleteItem, {
    onSuccess: (response) => {
      toast.error("Item Deleted Successfully", {
        position: "top-center",
        toastId: "successUser",
      });
      queryClient.invalidateQueries(["inventoryList"]);
      navigate("/stock");
    },
  });
  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(id);
    } catch (error) {
    }
  };
  const onSubmit = async () => {
    try {
      const ItemData = {
        item_description: values.item_description,
        quantity: values.quantity,
        unit_price: values.unit_price,
        total_price: values.total_price,
        unit_measurement: values.unit_measurement,
        purchase_date: values.purchase_date,
        expire_date:"0001-01-01",
        dealer_name: values.dealer_name,
      };
      await updateMutation.mutateAsync({ id: id, ItemData: ItemData });
    } catch (error) {
    }
  };
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        item_description: eachItem.item_description,
        quantity: eachItem.quantity,
        unit_price: eachItem.unit_price,
        total_price: eachItem.total_price,
        unit_measurement: eachItem.unit_measurement,
        dealer_name: eachItem.dealer_name,
        purchase_date: eachItem.purchase_date,
      },
      validationSchema: AddItemValidation,
      onSubmit,
    });
  return (
    <Layout>
      <form onSubmit={handleSubmit} className="flex flex-col px px-20">
        <div className=" relative w-fit mb-6 text-red font-roboto font-bold text-xl ">
          <span className="mb-2px">Edit Items</span>
          <div className="absolute h-2px -bottom-1 left-0 w-1/2 bg-blue"></div>
        </div>
        <div className="grid grid-cols-2 gap-x-11 gap-y-4">
          <InputField
            className="py-2"
            label="Item Description"
            id="item_description"
            name="item_description"
            value={values.item_description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              errors.item_description && touched.item_description
                ? errors.item_description
                : ""
            }
          />
          <InputField
            className="py-2"
            label="Quantity"
            id="quantity"
            name="quantity"
            value={values.quantity}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.quantity && touched.quantity ? errors.quantity : ""}
          />
          <InputField
            className="py-2"
            label="Unit Price"
            id="unit_price"
            name="unit_price"
            value={values.unit_price}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              errors.unit_price && touched.unit_price ? errors.unit_price : ""
            }
          />
          <InputField
            className="py-2"
            label="Total Price"
            id="total_price"
            name="total_price"
            value={values.total_price}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              errors.total_price && touched.total_price
                ? errors.total_price
                : ""
            }
          />
          <InputField
            className="py-2"
            label="Unit Of Measurement"
            id="unit_measurement"
            name="unit_measurement"
            value={values.unit_measurement}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              errors.unit_measurement && touched.unit_measurement
                ? errors.unit_measurement
                : ""
            }
          />
          <InputField
            className="py-2"
            label="Dealer Name"
            id="dealer_name"
            name="dealer_name"
            value={values.dealer_name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              errors.dealer_name && touched.dealer_name
                ? errors.dealer_name
                : ""
            }
          />
          <InputField
            className="py-2"
            label="Purchase Date"
            type="date"
            id="purchase_date"
            name="purchase_date"
            value={values.purchase_date}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              errors.purchase_date && touched.purchase_date
                ? errors.purchase_date
                : ""
            }
          />
          
        </div>
        <div className="flex justify-center mt-10 gap-10 w-full">
          <Button
            onClick={handleSubmit}
            type="button"
            text="Update Item"
            className="bg-blue px-8 hover:bg-blue_hover py-1 rounded-lg"
          />
          <Button
            onClick={handleDelete}
            type="button"
            text="Delete Item"
            className="bg-red px-8 py-1 rounded-lg"
          />
        </div>
      </form>
      <ToastContainer />
    </Layout>
  );
}

export default EditItems;
