import React, { useState } from "react";
import { TiDelete } from "react-icons/ti";
import InputField from "../../../components/common/inputField/InputField";
import Button from "../../../components/common/button/Button";

function AddPopUp({ Open, onClick, len }) {
  const [isAddOpen, setIsAddopen] = useState({ Open });
  const [itemDescription, setitemDescription] = useState();
  const [size, setSize] = useState();
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [totalPrice, setTotalPrice] = useState();
  let index = len;
  const handleOnclick = (event) => {
    event.preventDefault();
    setTotalPrice(Number(quantity) * Number(price));
    const Order = {
      id: index + 1,
      itemDecription: itemDescription,
      size: size,
      quantity: quantity,
      price: price,
      totalPrice: Number(quantity) * Number(price),
    };
    index++;
    onClick(Order);
    Open(false);
  };
  // console.log(input);
  return (
    <>
      <form className="flex flex-col bg-white px-10 shadow-2xl py-6 rounded-2xl">
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
              onChange={(e) => setitemDescription(e.target.value)}
            />
            <InputField
              label="Size"
              placeholder="size"
              className="py-1"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </div>
          <div className="flex flex-row gap-5 overflow-hidden justify-between">
            <InputField
              label="Quantity"
              placeholder="quantity"
              className="py-1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <InputField
              label="Price"
              placeholder="price"
              className="py-1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="flex flex-row gap-5 justify-between mb-3">
            {/* <InputField
                label="Total Price"
                placeholder="total price"
                className="py-1"
                value={totalPrice}
                onChange={(e) => setTotalPrice(e.target.value)}
              /> */}
            {totalPrice}
          </div>
          <Button
            text="Add Order"
            className="bg-blue text-white py-1 px-3 rounded-md hover:bg-blue_hover"
            onClick={handleOnclick}
          />
        </div>
      </form>
    </>
  );
}

export default AddPopUp;
