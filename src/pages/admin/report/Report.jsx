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

function Report() {
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

  return <Layout>Report</Layout>;
}

export default Report;
