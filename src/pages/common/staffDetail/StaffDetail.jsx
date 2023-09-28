import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import * as api from "../../../api/userApi";
import Card from "../../../components/common/card/Card";
import Button from "../../../components/common/button/Button";
import { useMutation, useQuery } from "react-query";
import Loading from '../../../assets/image/Loading.gif'
import useUserStore, { useUserData } from "../../../store/userStore";
function StaffDetail() {
  const CurrentUserData = useUserData();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const { id } = useParams();
  const user = useUserStore();
  const {
    data: userData,
    isLoading: userLoading,
    isError: roleError,
  } = useQuery("userData-store", () => api.SingleStaff(user.token, id));
  const deleteStaff = (userdata) => {
    const response = api.DeleteStaff(user.token, id);
    return response;
  };
  const deleteStaffMutation = useMutation(deleteStaff, {
    onSuccess: (response) => {
      navigate("/staffs");
    },
  });
  const handleDelete = () => {
    deleteStaffMutation.mutate(id);
  };
  if (userLoading) {
    return (
      <div className="flex bg-transparent h-screen w-full justify-center items-center">
        <img src={Loading} className="w-24 " alt="Loading..." />
      </div>
    );
  }
  return (
    <Layout>
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
    </Layout>
  );
}

export default StaffDetail;
