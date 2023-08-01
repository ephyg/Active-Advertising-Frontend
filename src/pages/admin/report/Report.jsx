import React from "react";
import SideBar from "../../../components/admin/sideBar/SideBar";
import Layout from "../../../components/Layout/Layout";
import { useState } from "react";

import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

// import BarChart from "./components/BarChart";
// import LineChart from "C:/Users/almax/active-advertising-frontend/src/components/LineChart.js";
import { UserData } from "./Data/Data";
import { JobData } from "./Data/Data1";
// import PieChart from "./components/PieChart";
import { Revenue } from "./Data/Data3";
import { BiBox } from "react-icons/bi";

function Report() {
  const [revenue, setRevenue] = useState({
    labels: Revenue.map((data) => data.month),
    datasets: [
      {
        label: "Profit  ",
        data: Revenue.map((data) => data.profit),
        backgroundColor: ["green"],
      },
      {
        label: "Expense ",
        data: Revenue.map((data) => data.expense),
        backgroundColor: ["red"],
      },
    ],
  });

  return (
    <Layout>
      <div class="flex justify-between py-6 pb-10 px-4">
        <div class="h-25 w-6/12  ">
          <Line data={revenue} />
        </div>
        {/* <div className="h-4/6 w-4/12 "> */}
        {/* box for individual data */}
        <div className=" w-5/12 pr-10 bg-blue justify-end border rounded-md p-24 shadow-md mr-7  ">
          {<h1>Job completed</h1>}
          <div className="">
            <svg
              className=""
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className=" static ... pt-10 h-48 grid grid-cols-3 gap-4  ">
        {/* <div className="w-50 h-100 border rounded-md p-4 bg-blue-200  shadow-md">1</div> */}
        <div className=" border rounded-md p-4 bg-blue  shadow-md w-10/12">1</div>
        <div className=" border rounded-md p-4 bg-blue  shadow-md w-10/12">9</div>
        <div className=" border rounded-md p-4 bg-blue  shadow-md w-10/12">1</div>
        <div className=" border rounded-md p-4 bg-blue  shadow-md w-10/12">1</div>
        <div className=" border rounded-md p-4 bg-blue  shadow-md w-10/12">9</div>
        <div className=" border rounded-md p-4 bg-blue  shadow-md w-10/12">9</div>
        <div className="absolute bottom-10 left-100 right-100 ... border rounded-md p-4 bg-blue  shadow-md w-2/12">19</div>
      </div>

      {/* <div className="line"><LineChart chartData={revenue}/></div> */}
      {/* <div className="pie"><PieChart chartData={userData}/></div>
<div className="bar"><BarChart chartData={jobData}/></div>
 */}
    </Layout>
  );
}

export default Report;
