import React from "react";
import { useQuery } from "react-query";
import useUserStore from "../../../../store/userStore";
import * as api from "../../../../api/userApi";
import StaffEmployeeComponent from "../AllocateStaff/StaffEmployeeComponent";
import FreelancerEmployeeComponent from "./FreelancerEmployeeComponent";

function FreelancerEmployee() {
  const user = useUserStore();
  const {
    data: EmployeeFreelancerList,
    isLoading: EmployeeFreelancerLoading,
    isError: EmployeeFreelancerError,
  } = useQuery("EmployeeFreelancerList-store", () => api.EmployeeFreelancerList(user.token));

  return (
    <div>
      {EmployeeFreelancerList && <FreelancerEmployeeComponent employeeFreelancerList={EmployeeFreelancerList} />}
    </div>
  );
}

export default FreelancerEmployee;
