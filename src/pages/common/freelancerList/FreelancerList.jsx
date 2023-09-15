import React from "react";
import Layout from "../../../components/Layout/Layout";
import { useQuery } from "react-query";
import * as api from "../../../api/userApi";
import FreelancerListComponent from "./FreelancerListComponent";
import useUserStore from "../../../store/userStore";
import Loading from '../../../assets/image/Loading.gif'

function FreelancerList() {
  const user = useUserStore();
  const {
    isLoading,
    data: freelancerData,
    isError,
  } = useQuery("allFreelancers", () => api.EmployeeFreelancerList(user.token));
  if (isLoading) {
    return  <div className="flex bg-transparent h-screen w-full justify-center items-center">
    <img src={Loading} className="w-24 " alt="Loading..." />
  </div>
  }
  return (
    <Layout>
      {freelancerData && (
        <FreelancerListComponent freelancerData={freelancerData} />
      )}
    </Layout>
  );
}

export default FreelancerList;
