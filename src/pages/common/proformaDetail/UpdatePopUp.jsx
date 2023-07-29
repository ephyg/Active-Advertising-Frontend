import React, { useState } from "react";
import { TiDelete } from "react-icons/ti";
import InputField from "../../../components/common/inputField/InputField";
import Button from "../../../components/common/button/Button";

function UpdatePopUp() {
  return (
    <div className="absolute shadow-2xl shadow-blue rounded-2xl p-8 inset-y-28 inset-x-48 flex flex-col  bg-white">
      <div className="flex  items-start justify-between mb-5">
        <h1 className="text-blue font-roboto font-bold text-base">Add Order</h1>
        <TiDelete
          size={35}
          color="red"
          className="hover:scale-110 cursor-pointer"
        />
      </div>
      <div className="flex-col flex gap-3">
        <div className="flex flex-row gap-5 overflow-hidden justify-between">
          <InputField
            label="Items Descritpion"
            placeholder="item"
            className="py-1"
            value="item"
          />
          <InputField
            label="Size"
            placeholder="quantity"
            className="py-1"
            value="size"
          />
        </div>
        <div className="flex flex-row gap-5 overflow-hidden justify-between">
          <InputField
            label="Quantity"
            placeholder="quantity"
            className="py-1"
            value="quantity"
          />
          <InputField
            label="Price"
            placeholder="price"
            className="py-1"
            value="price"
          />
        </div>
        <div className="flex flex-row gap-5 justify-between mb-3">
          <InputField
            label="Total Price"
            placeholder="total price"
            className="py-1"
            value="total price"
          />
        </div>
        <Button
          text="Update Order"
          className="bg-blue text-white py-1 px-3 rounded-md hover:bg-blue_hover"
        />
      </div>
    </div>
  );
}

export default UpdatePopUp;
