import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import Card from "../../../components/common/card/Card";
import data from "../orderList/DATA.json";
import Button from "../../../components/common/button/Button";
function OrderDetail() {
  const { id } = useParams();
  const filteredData = data.filter((item) => item.id == id);
  return (
    <Layout>
      <div className="flex flex-col px-20">
        <div className=" relative w-fit mb-6 text-red font-roboto font-bold text-xl ">
          <span className="mb-2px">Order Detail</span>
          <div className="absolute h-2px -bottom-1 left-0 w-1/2 bg-blue"></div>
        </div>
        <div className="flex  gap-10 pr-8 mb-7 items-center justify-center">
          <div className="flex flex-col gap-3 w-562">
            <Card
              text="Item Description"
              information={filteredData[0]["Items-Description"]}
            />
            <Card text="Quantity" information={filteredData[0]["Quantity"]} />
            <Card text="Each Price" information={filteredData[0]["Price"]} />
            <Card
              text="Total Price"
              information={filteredData[0]["Total-Price"]}
            />
            <Card text="Size" information={filteredData[0]["Size"]} />
          </div>
          <div className="flex flex-col gap-3 w-562">
            <Card text="Status" information={filteredData[0]["Status"]} />
            <Card text="Company Name" information="Company Name" />
            <Card
              text="Order Date"
              information={filteredData[0]["Order-Date"]}
            />
            <Card
              text="Delivery Date"
              information={filteredData[0]["Delivery-Date"]}
            />
            <Card text="Vendor Name" information="None" />
          </div>
        </div>
        <div className="flex justify-center gap-10 mb-20">
          <Button
            text="Allocate Order"
            className="text-center bg-blue rounded-md px-4 py-1 hover:bg-blue_hover"
          />
          <Button
            text="Delete"
            className="text-center bg-red rounded-md px-14 py-1  hover:bg-red_hover"
          />
        </div>
      </div>
    </Layout>
  );
}

export default OrderDetail;
