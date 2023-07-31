import React, { useState } from "react";
import { TiDelete } from "react-icons/ti";
import InputField from "../../../components/common/inputField/InputField";
import Button from "../../../components/common/button/Button";

function UpdatePopUp({ Open, id, data, onClick }) {
  console.log(id, "dfds", data[id]);
  const [itemDescription, setitemDescription] = useState(
    data[id]["itemDecription"]
  );
  const [size, setSize] = useState(data[id]["size"]);
  const [quantity, setQuantity] = useState(data[id]["quantity"]);
  const [price, setPrice] = useState(data[id]["price"]);
  const [totalPrice, setTotalPrice] = useState(data[id]["totalPrice"]);

  const handleUpdateClick = () => {
    setTotalPrice(Number(quantity) * Number(price));

    const updatedData = {
      id: data[id]["id"],
      itemDecription: itemDescription,
      size: size,
      quantity: quantity,
      price: price,
      totalPrice: Number(quantity) * Number(price),
    };
    data[id] = updatedData;
    console.log(data[id]);
    onClick(data);
    Open(false);
  };
  return (
    <div className="absolute bg-transparent w-full h-full">
      <div className="absolute shadow-2xl shadow-blue rounded-2xl p-8 inset-y-28 inset-x-48 flex flex-col  bg-white">
        <div className="flex  items-start justify-between mb-5">
          <h1 className="text-blue font-roboto font-bold text-base">
            Add Order
          </h1>
          <TiDelete
            size={35}
            color="red"
            className="hover:scale-110 cursor-pointer"
            onClick={() => Open(false)}
          />
        </div>
        <div className="flex-col flex gap-3">
          <div className="flex flex-row gap-5 overflow-hidden justify-between">
            <InputField
              label="Items Descritpion"
              placeholder="item"
              className="py-1"
              value={itemDescription}
              onChange={(e) => {
                setitemDescription(e.target.value);
              }}
            />
            <InputField
              label="Size"
              placeholder="quantity"
              className="py-1"
              value={size}
              onChange={(e) => {
                setSize(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-row gap-5 overflow-hidden justify-between">
            <InputField
              label="Quantity"
              placeholder="quantity"
              className="py-1"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />
            <InputField
              label="Price"
              placeholder="price"
              className="py-1"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          {/* <div className="flex flex-row gap-5 justify-between mb-3">
            <InputField
              label="Total Price"
              placeholder="total price"
              className="py-1"
              value={totalPrice}
              onChange={(e) => {
                setTotalPrice(e.target.value);
              }}
            />
          </div> */}
          <Button
            text="Update Order"
            className="bg-blue text-white py-1 px-3 rounded-md hover:bg-blue_hover"
            onClick={handleUpdateClick}
          />
        </div>
      </div>
    </div>
  );
}

export default UpdatePopUp;
