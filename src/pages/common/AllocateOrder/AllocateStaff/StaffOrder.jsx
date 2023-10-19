import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../../components/Layout/Layout";
import * as api from "../../../../api/userApi";
import * as apis from "../../../../api/proformaApi";
import Card from "../../../../components/common/card/Card";
import Button from "../../../../components/common/button/Button";
import Loading from "../../../../assets/image/Loading.gif";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useUserStore, { useUserData } from "../../../../store/userStore";
import useProformaStore from "../../../../store/proformaStore";
function StaffOrder() {
  const CurrentUserData = useUserData();
  const { eachProforma } = useProformaStore();
  const { number } = useUserStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useUserStore();
  const {
    data: userData,
    isLoading: userLoading,
    isError: roleError,
  } = useQuery("userData-store", () => api.SingleStaff(user.token, id));
  const {
    data: StaffOrder,
    isLoading: staffLoading,
    isError: staffError,
  } = useQuery("StaffOrder-store", () => api.staffOrderList(user.token, id));
  const {
    data: SingleOrder,
    isLoading: LoadingGetSingleOrder,
    isError,
  } = useQuery("GetSingleOrder-store", () =>
    apis.GetSingleOrder(user.token, number)
  );
  const updateOrder = (userdata) => {
    const response = apis.UpdateOrder(user.token, userdata);
    return response;
  };

  const UnallocateOrder = useMutation(updateOrder, {
    onSuccess: async (response) => {
      await queryClient.invalidateQueries([
        "userData-store",
        "StaffOrder-store",
      ]);
      await queryClient.refetchQueries({
        include: "active",
      });
    },
  });

  const handleUnallocated = () => {
    const StatusData = {
      status: "Unallocated",
      user_id: null,
      order_id: Number(number),
    };
    UnallocateOrder.mutate(StatusData);
  };
  const handleAllocate = () => {
    const StatusData = {
      status: "Allocated",
      user_id: Number(id),
      order_id: Number(number),
    };
    UnallocateOrder.mutate(StatusData);
  };

  if (userLoading) {
     return (
      <div className="flex bg-transparent h-screen w-full justify-center items-center">
        <img src={Loading} className="w-24 " alt="Loading..." />
      </div>
    );
  }
  if (staffLoading) {
     return (
      <div className="flex bg-transparent h-screen w-full justify-center items-center">
        <img src={Loading} className="w-24 " alt="Loading..." />
      </div>
    );
  }
  if (LoadingGetSingleOrder) {
     return (
      <div className="flex bg-transparent h-screen w-full justify-center items-center">
        <img src={Loading} className="w-24 " alt="Loading..." />
      </div>
    );
  }
  const StaffOrders = StaffOrder.data;
  return (
    <Layout>
      <div className="flex flex-col px-20 md:px-3 z-10">
        <div className=" relative w-full mb-6 text-red font-roboto font-bold text-xl md:items-center md:flex md:justify-center">
          <span className="mb-2px">Employee Order Detail</span>
          <div className="absolute h-2px -bottom-1 left-0 w-1/2 bg-blue"></div>
        </div>
        <div className="flex justify-center mb-10 rounded-full h-40 ">
          <img
            src={userData.user_image_url}
            alt=""
            className="w-40 flex flex-between rounded-full border-2 border-x-slate-500 border-y-red"
          />
        </div>
        <div className="grid grid-cols-2  gap-x-10 gap-y-4 mb-7 items-center justify-center md:pr-0 md:gap-x-3 md:gap-y-3">
          <Card text="First Name" information={userData.user_first_name} />
          <Card text="Last Name" information={userData.user_last_name} />
          <Card text="Phone Number" information={userData.user_phone_number} />
          <Card text="Email " information={userData.user_email} />
          <Card text="Address" information={userData.user_address} />
          <Card text="Role" information={userData.user_role} />
        </div>
        <div className="flex gap-10 justify-center">
          {eachProforma[0].status != "Completed" &&
            (SingleOrder[0].user_id == id ? (
              <Button
                onClick={handleUnallocated}
                text="Unallocate"
                className="text-center bg-red rounded-md px-14 py-1 mb-10 hover:bg-red_hover md:px-10 md:py-1 md:text-base"
              />
            ) : (
              <Button
                onClick={handleAllocate}
                text="Allocate"
                className="text-center bg-blue rounded-md px-14 py-1 mb-10 hover:bg-red_hover md:px-10 md:py-1 md:text-base"
              />
            ))}
        </div>
        {/* {eachProforma[0].status != "Completed" && ( */}

        <div className="flex justify-center gap-10 mb-20 md:gap-5">
          <table class="mb-3 min-w-full">
            <thead class="text-blue">
              <tr className="">
                <th class="py-1 border-slate-200 border-2  px-4 text-xs md:text-xxs text-left">
                  No.
                </th>
                <th class="py-1 border-slate-200 border-2 px-4 text-xs md:text-xxs text-left">
                  Items Description
                </th>
                <th class="py-1 border-slate-200 border-2 px-4 text-xs md:text-xxs text-left">
                  Size
                </th>
                <th class="py-1 border-slate-200 border-2 px-4 text-xs md:text-xxs text-left">
                  Vendor
                </th>
                <th class="py-1 border-slate-200 border-2 px-4 text-xs md:text-xxs text-left">
                  Quantity
                </th>
                <th class="py-1 border-slate-200 border-2 px-4 text-xs md:text-xxs text-left">
                  Status
                </th>
                <th class="py-1 border-slate-200 border-2 px-4 text-xs md:text-xxs text-left">
                  Unit Price
                </th>
                <th class="py-1 border-slate-200 border-2 px-4 text-xs md:text-xxs text-left">
                  Total Price
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-300">
              {StaffOrders.map((items, index) => (
                <tr className="cursor-pointer hover:bg-slate-200">
                  <td class="py-1 border-slate-200 border  text-xs md:text-xxs px-4">
                    <li key={index} className="list-none">
                      {index + 1}
                    </li>
                  </td>
                  <td class="py-1 border-slate-200 border text-xs md:text-xxs px-4">
                    {items.item_description}
                  </td>
                  <td class="py-1 border-slate-200 border text-xs md:text-xxs px-4">
                    {items.size}
                  </td>
                  <td class="py-1 border-slate-200 border text-xs md:text-xxs px-4">
                    {items.vendor_name}
                  </td>
                  <td class="py-1 border-slate-200 border text-xs md:text-xxs px-4">
                    {items.quantity}
                  </td>
                  <td class="py-1 border-slate-200 border text-xs md:text-xxs px-4">
                    {items.status}
                  </td>
                  <td class="py-1 border-slate-200 border text-xs md:text-xxs px-4">
                    {items.unit_price}
                  </td>
                  <td class="py-1 border-slate-200 border text-xs md:text-xxs px-4">
                    {Number(items.quantity) * Number(items.unit_price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default StaffOrder;
