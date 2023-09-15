import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import Layout from "../../../../components/Layout/Layout";
import * as api from "../../../../api/proformaApi";
import * as apis from "../../../../api/freelancerApi";
import Card from "../../../../components/common/card/Card";
import Button from "../../../../components/common/button/Button";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useUserStore, { useUserData } from "../../../../store/userStore";
import Layout from "../../../../components/Layout/Layout";
function FreeelancerEmployeeOrders() {
  const CurrentUserData = useUserData();
  const navigate = useNavigate();
  const { number } = useUserStore();
  const queryClient = useQueryClient();
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // });
  const { id } = useParams();
  const user = useUserStore();
  const {
    data: userData,
    isLoading: userLoading,
    isError: roleError,
  } = useQuery("userData-store", () => apis.SingleFreelancer(user.token, id));

  const {
    data: FreelancerOrder,
    isLoading: staffLoading,
    isError: staffError,
  } = useQuery("FreelancerOrder-store", () =>
    apis.FreelancerOrderList(user.token, id)
  );

  const updateOrder = (StatusData) => {
    const response = api.UpdateOrderFreelancer(user.token, StatusData);
    return response;
  };
  const UpdateOrderMutation = useMutation(updateOrder, {
    onSuccess: async (response) => {
      //   navigate("/staffs");
      console.log(userData);
      await queryClient.invalidateQueries([
        "userData-store",
        "FreelancerOrder-store",
      ]);
      await queryClient.refetchQueries({
        include: "active",
      });
      console.log("Success");
      console.log(response);
    },
  });
  //   console.log(number);
  const handleAllocate = () => {
    const StatusData = {
      status: "Allocated",
      freelancer_id: Number(id),
      order_id: Number(number),
    };
    // console.log(StatusData);
    UpdateOrderMutation.mutate(StatusData);
  };
  const handleUnallocate = () => {
    const StatusData = {
      status: "Unallocated",
      freelancer_id: null,
      order_id: Number(number),
    };
    UpdateOrderMutation.mutate(StatusData);
  };
  if (userLoading) {
    return <h1>loading</h1>;
  }
  if (staffLoading) {
    return <h1>Loading</h1>;
  }
  // console.log(userData);

  return (
    <Layout>
      <div className="flex flex-col px-20 md:px-3 z-10">
        <div className=" relative w-full mb-6 text-red font-roboto font-bold text-xl md:items-center md:flex md:justify-center">
          <span className="mb-2px">Freelancer Detail</span>
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
          <Card
            text="First Name"
            information={userData.freelancer_first_name}
          />
          <Card text="Last Name" information={userData.freelancer_last_name} />
          <Card
            text="Phone Number"
            information={userData.freelancer_phone_number}
          />
          <Card text="Email " information={userData.freelancer_email} />
          <Card text="Address" information={userData.freelancer_address} />
          <Card
            text="Portfolio"
            information={userData.freelancer_portfolio_link}
          />
          <Card text="Status" information={userData.status} />
        </div>

        <div className="flex justify-center gap-10 mb-10 md:gap-5">
          {/* {userData.status != "Allocated" && ( */}
          <Button
            onClick={handleAllocate}
            text="Allocate"
            className="text-center bg-blue rounded-md px-14 py-1  hover:bg-red_hover md:px-10 md:py-1 md:text-base"
          />
          <Button
            onClick={handleUnallocate}
            text="Unallocate"
            className="text-center bg-red rounded-md px-14 py-1  hover:bg-red_hover md:px-10 md:py-1 md:text-base"
          />
          {/* )} */}
        </div>
        <div className="mb-20">
          <div className="flex"></div>
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
                  Unit Price
                </th>
                <th class="py-1 border-slate-200 border-2 px-4 text-xs md:text-xxs text-left">
                  Total Price
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-300">
              {FreelancerOrder.map((items, index) => (
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

export default FreeelancerEmployeeOrders;
