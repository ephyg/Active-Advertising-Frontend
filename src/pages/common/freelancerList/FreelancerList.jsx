import React from "react";
import Layout from "../../../components/Layout/Layout";
import { useQuery } from "react-query";
import * as api from "../../../api/freelancerApi";
import FreelancerListComponent from "./FreelancerListComponent";
import useUserStore from "../../../store/userStore";

function FreelancerList() {
  const user = useUserStore();
  const {
    isLoading,
    data: freelancerData,
    isError,
  } = useQuery("allFreelancers", () => api.GetAllFreelancer(user.token));
  if (isLoading) {
    return <h1>Loading...</h1>;
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
