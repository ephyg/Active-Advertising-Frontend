import React from "react";
import Layout from "../../../components/Layout/Layout";
import InputField from "../../../components/common/inputField/InputField";
import Button from "../../../components/common/button/Button";

function AddItems() {
  return (
    <Layout>
      <div className="flex flex-col px px-20">
        <div className=" relative w-fit mb-6 text-red font-roboto font-bold text-xl ">
          <span className="mb-2px">Add Items</span>
          <div className="absolute h-2px -bottom-1 left-0 w-1/2 bg-blue"></div>
        </div>
        <div className="grid grid-cols-2 gap-x-11 gap-y-4">
          <InputField className="py-2" label="Item Description" />
          <InputField className="py-2" label="Quantity" />
          <InputField className="py-2" label="Unit Price" />
          <InputField className="py-2" label="Total Price" />
          <InputField className="py-2" label="Unit Of Measurement" />
          <InputField className="py-2" label="Dealer Name" />
          <InputField className="py-2" label="Purchase Date" type="date" />
          <InputField className="py-2" label="Expire Date" type="date" />
        </div>
        <Button text="Add Item" className="bg-blue px-8 mt-10 hover:bg-blue_hover py-1 rounded-lg" />
      </div>
    </Layout>
  );
}

export default AddItems;
