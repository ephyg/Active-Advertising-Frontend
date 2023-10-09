import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import * as api from "../../../api/userApi";
import Card from "../../../components/common/card/Card";
import Button from "../../../components/common/button/Button";
<<<<<<< HEAD
import { useMutation, useQuery, useQueryClient } from "react-query";
=======
import { useMutation, useQuery } from "react-query";
>>>>>>> 0ac4fa7 (delete functionality and done freelancer button)
import Loading from "../../../assets/image/Loading.gif";
import useUserStore, { useUserData } from "../../../store/userStore";
import { MdClose } from "react-icons/md";
function StaffDetail() {
  const CurrentUserData = useUserData();
  const [DeletePopUp, setDeletePopUp] = useState();
  const navigate = useNavigate();
<<<<<<< HEAD
  const queryClient = useQueryClient();
=======
>>>>>>> 0ac4fa7 (delete functionality and done freelancer button)

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
  const deleteStaff = (userdata) => {
    const response = api.DeleteStaff(user.token, id);
    return response;
  };
  const deleteStaffMutation = useMutation(deleteStaff, {
    onSuccess: async (response) => {
      await queryClient.invalidateQueries(["userList", "all"]);
      await queryClient.refetchQueries({
        include: "active",
      });
      navigate("/staffs");

    },
  });
<<<<<<< HEAD

  const handleDelete = () => {
    setDeletePopUp(true);
  };
  const handleDeletePopUp = async () => {
=======
 
  const handleDelete = () => {
    setDeletePopUp(true);
  };
  const handleDeletePopUp = () => {
>>>>>>> 0ac4fa7 (delete functionality and done freelancer button)
    deleteStaffMutation.mutate(id);
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
  return (
    <Layout>
      {DeletePopUp && (
        <div class="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
          <div class="w-full max-w-lg bg-white shadow-lg rounded-md px-5 py-4 relative">
            <MdClose
              size={24}
              onClick={(e) => setDeletePopUp(false)}
              class="font-roboto font-bold cursor-pointer shrink-0 fill-black hover:fill-red-500 float-right"
            />
            <div class="my-8">
              <h4 class="text-base text-red font-bold mt-4">
                Are You sure you want to delete?
              </h4>
              <p class="text-sm text-gray-400 mt-2">
                Once you click the 'Yes' button, there's no turning back. Please
                ensure that you want to delete before proceeding.
              </p>
            </div>
            <div class="text-right space-x-4">
              <button
                onClick={(e) => {
                  setDeletePopUp(false);
                }}
                type="button"
                class="px-6 py-2 min-w-[150px] rounded text-[#333] text-sm font-semibold border-none outline-none bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
              >
                No, cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeletePopUp()}
                class="px-6 py-2 min-w-[150px] rounded text-white text-sm font-semibold border-none outline-none bg-red hover:bg-red"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col px-20 md:px-3 z-10">
        <div className=" relative w-full mb-6 text-red font-roboto font-normal text-2xl md:items-center md:flex md:justify-center">
          <span className="mb-2px">Staff Detail</span>
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
        <div className="flex justify-center gap-10 mb-20 md:gap-5">
          {CurrentUserData.id != id ? (
            <Button
              onClick={handleDelete}
              text="Delete"
              className="text-center bg-red rounded-md px-14 py-1  hover:bg-red_hover md:px-10 md:py-1 md:text-base"
            />
          ) : (
            ""
          )}
        </div>
      </div>
      {!(
        userData.user_role == "admin" || userData.user_role == "account-manager"
      ) && (
        <div className="flex justify-center gap-10 mb-20 mx-20 md:gap-5">
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
              {StaffOrder.data.map((items, index) => (
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
      )}
    </Layout>
  );
}

export default StaffDetail;
