import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import * as api from "../../../api/userApi";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import * as apis from "../../../api/staffApi";
import useUserStore from "../../../store/userStore";
import StaffListComponent from "./StaffListComponent";
import Loading from "../../../assets/image/Loading.gif";

function StaffList() {
  const queryClient = useQueryClient();
  const [uRole, setURole] = useState("all");
  const user = useUserStore();
  const {
    data: userRole,
    isLoading: roleLoading,
    isError: roleError,
  } = useQuery("userRole-store", () => apis.GetRole(user.token));
  const {
    data: userList,
    isLoading,
    isError: userListError,
  } = useQuery("userList", () => api.AllStaffs(user.token, uRole), {
    refetchOnWindowFocus: true,
  });
  useEffect(() => {
    queryClient.invalidateQueries(["userList"]);
  }, [uRole]);
  // console.log(userList);

  // console.log(userList);

  if (roleLoading) {
    return (
      <div className="flex bg-transparent h-screen w-full justify-center items-center">
        <img src={Loading} className="w-24 " alt="Loading..." />
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex bg-transparent h-screen w-full justify-center items-center">
        <img src={Loading} className="w-24 " alt="Loading..." />
      </div>
    );
  }
  // if (roleError && userListError) {
  //   console.log(roleError, userListError);
  // }

  // console.log(uRole);
  // console.log(userList);
  return (
    <Layout>
      <div className="w-full md:flex  items-center flex justify-between">
        <div className=" relative w-fit mb-6 text-red font-roboto font-bold text-xl ">
          <span className="mb-2px">Staff List</span>
          <div className="absolute h-2px -bottom-1 left-0 w-1/2 bg-blue"></div>
        </div>
        <select
          data-te-select-init
          className="h-12 border-2 border-blue bg-white outline-none text-blue py-1 rounded-md px-4 font-roboto"
          id="role"
          name="role"
          value={uRole}
          onChange={(e) => {
            setURole(e.target.value);
          }}
          //   onBlur={handleBlur}
        >
          <option value="all" className="">
            Select Employee
          </option>
          {userRole.map((item, index) => (
            <option
              value={item.role}
              onClick={(e) => setURole(e.target.value)}
              className=""
            >
              {item.role}
            </option>
          ))}
        </select>
      </div>
      {userList && <StaffListComponent userLists={userList} />}
    </Layout>
  );
}

export default StaffList;
