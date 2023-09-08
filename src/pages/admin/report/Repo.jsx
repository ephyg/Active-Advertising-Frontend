import React from "react";
import SideBar from "../../../components/admin/sideBar/SideBar";
import Layout from "../../../components/Layout/Layout";
import { useState } from "react";
import MyDatePicker from "./datePicker";
import "./report.css";
import ProgressBar from "./ProgressBar";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

// import BarChart from "./components/BarChart";
// import LineChart from "C:/Users/almax/active-advertising-frontend/src/components/LineChart.js";

// import PieChart from "./components/PieChart";
import { Revenue } from "./Data/Data3";
import MyDatePickerComponent from "./datePicker";
import { FaRegCheckSquare } from "react-icons/fa";

function Repo() {
  const [revenue, setRevenue] = useState({
    labels: Revenue.map((data) => data.month),
    datasets: [
      {
        label: "Profit  ",
        data: Revenue.map((data) => data.profit),
        borderColor: ["green"],
        backgroundColor: ["green"],
      },
      {
        label: "Expense ",
        data: Revenue.map((data) => data.expense),
        borderColor: ["red"],
        backgroundColor: ["red"],
      },
    ],
  });
  // -------------------------progress bar starts here percent generator ------------------------------------------------------
  const randomPercentage = Math.floor(Math.random() * 101);

  // const TotalRevenueComponent = () => {

  //   const { totalrevenue, fetchRevenueFromDatabase } = useContext(DatabaseContext);

  //   // calling fetching function
  //   useEffect(() => {
  //     fetchRevenueFromDatabase();
  //   }, []);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-5">
        <div className="text-red font-roboto font-bold text-xl md:items-center md:flex md:justify-center">
          Weekly Report
        </div>
        <div class="">
          <MyDatePickerComponent />
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="w-562 h-562">
          <Line data={revenue} />
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            <div className="bg-blue flex justify-center gap-6 items-center rounded-md py-1">
              <div className="">
                <FaRegCheckSquare color="white" size={30} />
              </div>
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-white font-roboto text-xl font-semibold">
                  Fresh Inventory
                </h1>
                <h1 className="text-white font-roboto text-base">23</h1>
              </div>
            </div>
            <div className="bg-blue flex justify-center gap-6 items-center rounded-md py-1">
              <div className="">
                <FaRegCheckSquare color="white" size={30} />
              </div>
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-white font-roboto text-xl font-semibold">
                  Fresh Inventory
                </h1>
                <h1 className="text-white font-roboto text-base">23</h1>
              </div>
            </div>
            <div className="bg-blue flex justify-center gap-6 items-center rounded-md py-1">
              <div className="">
                <FaRegCheckSquare color="white" size={30} />
              </div>
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-white font-roboto text-xl font-semibold">
                  Fresh Inventory
                </h1>
                <h1 className="text-white font-roboto text-base">23</h1>
              </div>
            </div>
            <div className="bg-blue flex justify-center gap-6 items-center rounded-md py-1">
              <div className="">
                <FaRegCheckSquare color="white" size={30} />
              </div>
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-white font-roboto text-xl font-semibold">
                  Fresh Inventory
                </h1>
                <h1 className="text-white font-roboto text-base">23</h1>
              </div>
            </div>
          </div>
          <div className="flex bg-blue items-center rounded-lg h-20">
            <div className="bg-blue flex justify-between items-center">
              <p>Goal Completion</p>
              <p>60%</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Repo;
