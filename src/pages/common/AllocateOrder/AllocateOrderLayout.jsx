import React, { useState } from "react";
// import Layout from "../../../components/Layout/Layout";
import FreelancerEmployee from "./AllocateFreelancer/FreelancerEmployee";
import StaffEmployeeComponent from "./AllocateStaff/StaffEmployeeComponent";
import Layout from "../../../components/Layout/Layout";
import StaffEmployee from "./AllocateStaff/StaffEmployee";
import FreelancerEmployee from "./AllocateFreelancer/FreelancerEmployee";
// import StaffEmployee from "./StaffEmployee";
// import FreelancerEmployee from "./FreelancerEmployee";
import FreelancerEmployeeComponent from "./AllocateFreelancer/FreelancerEmployeeComponent";
import StaffEmployee from "./AllocateStaff/StaffEmployee";

function AllocateOrderLayout() {
  const [toggle, setToggle] = useState("staff");
  const handleStaffClick = () => {
    setToggle("staff");
  };
  const handleFreelancerClick = () => {
    setToggle("freelancer");
  };
  return (
    <Layout>
      <div className="">
        <div className="w-full md:flex justify-center items-center">
          <div className=" relative w-fit mb-6 text-red font-roboto font-bold text-xl ">
            <span className="mb-2px">Allocate Order</span>
            <div className="absolute h-2px -bottom-1 left-0 w-1/2 bg-blue"></div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleStaffClick}
            className={`px-4 py-1  rounded text-white font-roboto ${
              toggle == "staff" ? "bg-red" : "bg-blue "
            }`}
          >
            Staff
          </button>
          <button
            onClick={handleFreelancerClick}
            className={`px-4 py-1  rounded text-white font-roboto ${
              toggle == "freelancer" ? "bg-red" : "bg-blue"
            }`}
          >
            Freelancer
          </button>
        </div>
        {toggle == "staff" && <StaffEmployee />}
        {toggle == "freelancer" && <FreelancerEmployee />}
      </div>
    </Layout>
  );
}

export default AllocateOrderLayout;
