import React from "react";
import { useQuery } from "react-query";
import useUserStore from "../../../store/userStore";
import * as api from "../../../api/userApi";
import StaffEmployeeComponent from "./StaffEmployeeComponent";

function StaffEmployee() {
  const user = useUserStore();
  const {
    data: EmployeeList,
    isLoading: EmployeeListLoading,
    isError: EmployeeListError,
  } = useQuery("EmployeeList-store", () => api.EmployeeStaffList(user.token));

  return (
    <div>
      {EmployeeList && <StaffEmployeeComponent employeeList={EmployeeList} />}
    </div>
  );
}

export default StaffEmployee;
