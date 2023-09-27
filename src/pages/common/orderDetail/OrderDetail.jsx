import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import Card from "../../../components/common/card/Card";
import Button from "../../../components/common/button/Button";
import useProformaStore from "../../../store/proformaStore";
import * as api from "../../../api/proformaApi";
import { useQuery, useQueryClient } from "react-query";
import Loading from "../../../assets/image/Loading.gif";
import useUserStore from "../../../store/userStore";
function OrderDetail() {
  const user = useUserStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const { setNumber, number } = useUserStore();
  const { setProformaDetail, eachOrder, eachProforma } = useProformaStore();
  const {
    data: OrderedEmployee,
    isLoading: OrderedEmployeeLoading,
    isError,
  } = useQuery("OrderedEmployee-store", () =>
    api.OrderedEmployee(user.token, id)
  );
  const filteredData = eachOrder.filter((item) => item.id == id);
  if (OrderedEmployeeLoading) {
    return (
      <div className="flex bg-transparent h-screen w-full justify-center items-center">
        <img src={Loading} className="w-24 " alt="Loading..." />
      </div>
    );
  }
  const handleEmployee = async () => {
    await setNumber(id);
    if (OrderedEmployee[0].user_role) {
      navigate(`/staffs-order/${OrderedEmployee[0].id}`);
    } else {
      navigate(`/freelancer-order/${OrderedEmployee[0].id}`);
    }
  };
  const handleAllocateOrder = async () => {
    await setNumber(id);
    navigate(`/allocate-order`);
  };

 
  return (
    <Layout>
      <div className="flex flex-col px-20 md:px-3 z-10">
        <div className=" relative w-full mb-6 text-red font-roboto font-bold text-xl md:items-center md:flex md:justify-center">
          <span className="mb-2px">Order Detail</span>
          <div className="absolute h-2px -bottom-1 left-0 w-1/2 bg-blue"></div>
        </div>
        <div className="grid grid-cols-2  gap-x-10 gap-y-4  pr-8 mb-7 items-center justify-center md:pr-0 md:gap-x-3 md:gap-y-3">
          <Card
            text="Item Description"
            information={filteredData[0].item_description}
          />
          <Card text="Quantity" information={filteredData[0].quantity} />
          <Card text="Unit Price" information={filteredData[0].unit_price} />
          <Card
            text="Total Price"
            information={
              Number(filteredData[0].quantity) *
              Number(filteredData[0].unit_price)
            }
          />
          <Card text="Size" information={filteredData[0].size} />
          <Card text="Status" information={filteredData[0].status} />
          <Card text="Company Name" information={eachProforma[0].client_name} />
          <Card text="Order Date" information={eachProforma[0].invoice_date} />
          <Card text="Vendor Name" information={filteredData[0].vendor_name} />
        </div>
        <div className="flex justify-center gap-10 mb-20 md:gap-5">
          {eachProforma[0].status == "Verified" ? (
            filteredData[0].status == "Unallocated" ? (
              <Button
                text="Allocate Order"
                className="text-center bg-blue rounded-md px-4 py-1 hover:bg-blue_hover md:px-2 md:py-1 md:text-base"
                onClick={handleAllocateOrder}
              />
            ) : (
              <Button
                text="Employee"
                onClick={handleEmployee}
                className="text-center bg-blue rounded-md px-4 py-1 hover:bg-blue_hover md:px-2 md:py-1 md:text-base "
              />
            )
          ) : eachProforma[0].status == "Completed" ? (
            <Button
              text="Employee"
              onClick={handleEmployee}
              className="text-center bg-blue rounded-md px-4 py-1 hover:bg-blue_hover md:px-2 md:py-1 md:text-base "
            />
          ) : (
            ""
          )}
          <Button
            text="Delete"
            className="text-center bg-red rounded-md px-14 py-1  hover:bg-red_hover md:px-10 md:py-1 md:text-base"
          />
        </div>
      </div>
    </Layout>
  );
}

export default OrderDetail;
