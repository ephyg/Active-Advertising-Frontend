import React, { useEffect } from "react";
import SideBar from "../../../components/admin/sideBar/SideBar";
import Layout from "../../../components/Layout/Layout";
import { useState } from "react";
import MyDatePicker from "./datePicker";
import "./report.css";
import ProgressBar from "./ProgressBar";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import * as api from "../../../api/reportApi";

// import BarChart from "./components/BarChart";
// import LineChart from "C:/Users/almax/active-advertising-frontend/src/components/LineChart.js";

// import PieChart from "./components/PieChart";
// import { Revenue } from "./Data/Data3";
import MyDatePickerComponent from "./datePicker";
import { FaCar, FaCheck, FaRegCheckSquare, FaRegListAlt } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";
import useUserStore from "../../../store/userStore";
import { useQuery } from "react-query";

function Report() {
  const { user, token } = useUserStore();
  const [day, setDay] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [searchDate, setSearchDate] = useState();
  const {
    data: ReportData,
    isLoading: ReportLoading,
    isError: roleError,
  } = useQuery(["Report-store", searchDate], () =>
    api.GetReport(token, searchDate)
  );
  const handleSearch = () => {
    console.log(searchDate);
  };
  if (ReportLoading) {
    return <h1>Return loading</h1>;
  }

  // console.log(ReportData.daily_totals.friday_profit);
  const Revenue = [
    {
      id: 1,
      month: "Mon",
      profit: ReportData.daily_totals.monday_profit,
      expense: ReportData.daily_totals.monday_price,
    },
    {
      id: 2,
      month: "Tus",
      profit: ReportData.daily_totals.tuesday_profit,
      expense: ReportData.daily_totals.monday_price,
    },
    {
      id: 3,
      month: "Wen",
      profit: ReportData.daily_totals.wednesday_profit,
      expense: ReportData.daily_totals.wednesday_price,
    },
    {
      id: 4,
      month: "Thur",
      profit: ReportData.daily_totals.thursday_profit,
      expense: ReportData.daily_totals.thursday_price,
    },
    {
      id: 5,
      month: "Fri",
      profit: ReportData.daily_totals.friday_profit,
      expense: ReportData.daily_totals.friday_price,
    },
    {
      id: 6,
      month: "Sat",
      profit: ReportData.daily_totals.saturday_profit,
      expense: ReportData.daily_totals.saturday_price,
    },
  ];
  const revenue = {
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
  };
  return (
    <Layout>
      <div className="flex justify-between items-center mb-5">
        <div className="text-red font-roboto font-bold text-xl md:items-center md:flex md:justify-center">
          Weekly Report
        </div>
        <div class="">
          <div className="flex gap-3 border border-solid border-blue p-2 rounded-md">
            <input
              className="border-none bg-transparent outline-none"
              label="Purchase Date"
              type="date"
              id="purchase_date"
              name="purchase_date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:text-red text-blue font-bold rounded"
            >
              Search
            </button>
          </div>
          {/* <MyDatePickerComponent
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          /> */}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-10 md:grid-cols-1">
        <div className="">
          <Line data={revenue} />
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            <div className="bg-blue flex justify-center gap-6 items-center rounded-md py-1">
              <div className="">
                <FaRegCheckSquare color="white" size={25} />
              </div>
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-white font-roboto text-lg font-semibold">
                  Fresh Inventory
                </h1>
                <h1 className="text-white font-roboto text-base">
                  {ReportData.totalStock}
                </h1>
              </div>
            </div>
            <div className="bg-blue flex justify-center gap-6 items-center rounded-md py-1">
              <div className="">
                <HiOutlineUserGroup color="white" size={25} />
              </div>
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-white font-roboto text-lg font-semibold">
                  Customer
                </h1>
                <h1 className="text-white font-roboto text-base">
                  {ReportData.totalCustomer}
                </h1>
              </div>
            </div>
            <div className="bg-blue flex justify-center gap-6 items-center rounded-md py-1">
              <div className="">
                <FaCheck color="white" size={25} />
              </div>
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-white font-roboto text-lg font-semibold">
                  Approved Proformas
                </h1>
                <h1 className="text-white font-roboto text-base">
                  {ReportData.approvedOrder}
                </h1>
              </div>
            </div>
            <div className="bg-blue flex justify-center gap-6 items-center rounded-md py-1">
              <div className="">
                <FaRegListAlt color="white" size={25} />
              </div>
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-white font-roboto text-lg font-semibold">
                  Total Orders
                </h1>
                <h1 className="text-white font-roboto text-base">
                  {ReportData.totalOrder}
                </h1>
              </div>
            </div>
          </div>
          <div className="flex bg-blue items-center justify-center rounded-lg h-20 flex-col w-full px-6 ">
            <div className="bg-blue flex text-center w-full justify-between items-center">
              <p className="text-white font-roboto">Goal Completion</p>
              <p className="text-white font-roboto">60%</p>
            </div>
            <div className="h-2 bg-white w-full rounded-b-md rounded-t-md mb-3 mt-1">
              <div className="h-2 w-3/4 bg-red rounded-b-md rounded-t-md"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full bg-blue rounded-md px-5 py-2 flex-col gap-1 mt-10">
        <h1 className="text-white font-roboto">Goal Completions</h1>
        <div className="flex h-1 w-full bg-red mb-1"></div>
        <div className="flex justify-between">
          <div className="flex gap-2 justify-center items-center">
            <img
              class="w-12"
              src="src/pages/admin/report/images/Rectangle 252.png"
              alt=""
            />
            <div className="flex flex-col gap-1">
              <h4 className="text-sm">Total Revenue</h4>
              <h1 className="text-3xl font-semibold dark:text-white">
                {Number(ReportData.totalRevenue).toFixed(2)} Birr
              </h1>
            </div>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <img
              class="w-12"
              src="src/pages/admin/report/images/Rectangle 253.png"
              alt=""
            />
            <div className="flex flex-col gap-1">
              <h4 className="text-sm">Total Cost</h4>
              <h1 className="text-3xl font-semibold dark:text-white">
                {Number(ReportData.totalCost).toFixed(2)} Birr
              </h1>
            </div>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <img
              class="w-12"
              src="src/pages/admin/report/images/Rectangle 254.png"
              alt=""
            />
            <div className="flex flex-col gap-1">
              <h4 className="text-sm">Total Profit</h4>
              <h1 className="text-3xl font-semibold dark:text-white">
                {Number(ReportData.totalProfit).toFixed(2)} Birr
              </h1>
            </div>
          </div>
        </div>
        <div className="flex h-1 w-full bg-red mt-1 mb-3"></div>
      </div>
      <div className="flex mt-10 justify-between gap-10 px-20">
        <div className="bg-blue flex justify-center gap-6 items-center rounded-md px-10">
          <FaCar size={24} />
          <div className="flex flex-col">
            <h1 className="text-white font-roboto text-center">
              Delivered Order
            </h1>
            <h1 className="text-white font-roboto text-center">
              {ReportData.deliveredOrder}
            </h1>
          </div>
        </div>
        <div className="bg-blue flex justify-center gap-6 items-center rounded-md  px-10">
          <FaCar size={24} />
          <div className="flex flex-col">
            <h1 className="text-white font-roboto text-center">
              Completed Order
            </h1>
            <h1 className="text-white font-roboto text-center">
              {ReportData.completedOrder}
            </h1>
          </div>
        </div>
        <div className="bg-blue flex justify-center gap-6 items-center rounded-md px-10">
          <FaCar size={24} />
          <div className="flex flex-col">
            <h1 className="text-white font-roboto text-center">
              Allocated Orders
            </h1>
            <h1 className="text-white font-roboto text-center">
              {ReportData.allocatedOrder}
            </h1>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Report;
