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

  // const TotalRevenueComponent = () => {

  //   const { totalrevenue, fetchRevenueFromDatabase } = useContext(DatabaseContext);

  //   // calling fetching function
  //   useEffect(() => {
  //     fetchRevenueFromDatabase();
  //   }, []);

  return <Layout><section style={{ gap: "8px" }}>
  <div className="display flex ">
    <div className="mb-2px">
      <h1 className=" w-fit mb-6 text-red font-roboto font-normal text text-2xl">
        Weekly Report{" "}
      </h1>
    </div>
    <div class="absolute top-5 right-32">
      <MyDatePickerComponent />
    </div>
  </div>
  <div
    style={{
      width: "1366px",
      height: "768px",
      display: "grid",
      gridTemplateRows: "fr",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "8px",
    }}
  >
    <div class="continear" style={{ width: "550px", height: "300px" }}>
      <Line data={revenue} />
    </div>
    {/* -==================================middle large dive containing total cost,revenue and profit */}
    <div class="middleDiv">
      <div
        className="   border rounded-3xl p-4 bg-blue  shadow-md "
        style={{ width: "1150px", height: "180px" }}
      >
        <h1 className="-mt-2 text-lg font-normal dark:text-white">
          Goals Completion{" "}
        </h1>
        <div class="line"></div>
        <div class="flex">
          <div className="flex-1 pl-6">
            <h4 className="pl-20 -mt-3 -mb-2 text-sm  dark:text-white">
              Total Revenue
            </h4>
            <img
              class="ml-4 mt-3"
              src="src/pages/admin/report/images/Rectangle 252.png"
              alt=""
            />
            <h1 className=" pl-24 -mt-12 text-3xl font-semibold dark:text-white">{/* {totalrevenue}  */}
              2050000 Birr{" "}
            </h1>
          </div>
          <div className="flex-1 pl-6">
            <h4 className="pl-20 -mt-3 -mb-2 text-sm  dark:text-white">
              Total Cost
            </h4>
            <img
              class="ml-4 mt-3"
              src="src/pages/admin/report/images/Rectangle 253.png"
              alt=""
            />
            <h1 className=" pl-24 -mt-12 text-3xl font-semibold dark:text-white">
              1500000 Birr{" "}
            </h1>
          </div>
          <div className="flex-1 pl-6">
            <h4 className="pl-20 -mt-3 -mb-2 text-sm  dark:text-white">
              Total Profit
            </h4>
            <img
              class="ml-4 mt-3"
              src="src/pages/admin/report/images/Rectangle 254.png"
              alt=""
            />
            <h1 className=" pl-24 -mt-12 text-3xl font-semibold dark:text-white">
              850000 Birr{" "}
            </h1>
          </div>
        </div>
        <div class="line2"></div>
      </div>
    </div>

    {/*---------------------------- upper information box grid ------------------------------------------ */}
    <div class="layout">
      <div className=" h-16 flex border rounded-md p-4 bg-blue  shadow-md">
        <div className="pt-2 -mt-2 pl-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            class="w-6 h-6"
          >
            <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
            <path
              fill-rule="evenodd"
              d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zM12 10.5a.75.75 0 01.75.75v4.94l1.72-1.72a.75.75 0 111.06 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 111.06-1.06l1.72 1.72v-4.94a.75.75 0 01.75-.75z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div className="pl-16  ">
          <h1 className="-mt-4 -ml-10 text-2xl font-normal dark:text-white ">
            Fresh Inventory
          </h1>
        </div>
        <span className="pt-4 -ml-24 text-medium font-normal dark:text-white ">
          23
        </span>
      </div>

      <div className=" h-16 flex border rounded-md p-4 bg-blue  shadow-md">
        <div className="pt-2 -mt-2 pl-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div className="pl-16  ">
          <h1 className="-mt-4 -ml-12 text-2xl font-semibold dark:text-white ">
            Aprroved Orders
          </h1>
        </div>
        <span className="pt-4 -ml-24 text-medium font-medium dark:text-white ">
          34
        </span>
      </div>
      <div className=" h-16 flex border rounded-md p-4 bg-blue  shadow-md">
        <div className="pt-2 -mt-2 pl-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            class="w-6 h-6"
          >
            <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
            <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" />
            <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
          </svg>
          
        </div>
        <div className="pl-16  ">
          <h1 className="-mt-4 -ml-12 text-2xl font-semibold dark:text-white ">
            Deliverd Order
          </h1>
        </div>
        <span className="pt-4 -ml-24 text-medium font-medium dark:text-white ">
          17
        </span>
      </div>
      <div className=" h-16 flex border rounded-md p-4 bg-blue  shadow-md">
        <div className="pt-2 -mt-2 pl-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z"
              clip-rule="evenodd"
            />
            <path
              fill-rule="evenodd"
              d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zm9.586 4.594a.75.75 0 00-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 00-1.06 1.06l1.5 1.5a.75.75 0 001.116-.062l3-3.75z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div className="pl-16 ">
          <h1 className="-mt-4 -ml-12 text-2xl font-semibold dark:text-white ">
            Completed Order
          </h1>
        </div>
        <span className="pt-4 -ml-24 text-medium font-medium dark:text-white ">
          23
        </span>
      </div>

      {/* --------------progress bar box--------------------- */}
      <div className=" w-12/12 h-16 flex border rounded-md p-4 bg-blue  shadow-md">
        <div>
          <h1 className="-mt-4 text-lg font-semibold dark:text-white">
            Goal Completion
          </h1>
          <ProgressBar percentage={randomPercentage} />
        </div>
      </div>
    </div>
    {/* ==============================bottom information box=================================================== */}
  </div>
  <div class="flex space-x-20 div4 ">
    <div className="flex-1 div4ElementWidth   h-16 ml-24  flex border rounded-md p-4 bg-blue  shadow-md">
      <div className="pt-2 -mt-2 pl-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          class="w-6 h-6"
        >
          <path
            fill-rule="evenodd"
            d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z"
            clip-rule="evenodd"
          />
          <path
            fill-rule="evenodd"
            d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div className="pl-14 ">
        <h1 className="-mt-4 -ml-12 text-2xl font-semibold dark:text-white ">
          Allocated Order
        </h1>
      </div>
      <span className="pt-4 -ml-24 text-medium font-medium dark:text-white ">
        23
      </span>
    </div>

    <div className="flex-1 div4ElementWidth   h-16  flex border rounded-md p-4 bg-blue  shadow-md">
      <div className="pt-2 -mt-2 pl-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          class="w-6 h-6"
        >
          <path
            fill-rule="evenodd"
            d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z"
            clip-rule="evenodd"
          />
          <path
            fill-rule="evenodd"
            d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div className="pl-14 ">
        <h1 className="-mt-4 -ml-12 text-2xl font-semibold dark:text-white ">
          Allocated Order
        </h1>
      </div>
      <span className="pt-4 -ml-24 text-medium font-medium dark:text-white ">
        23
      </span>
    </div>

    <div className="flex-1 div4ElementWidth   h-16  flex border rounded-md p-4 bg-blue  shadow-md">
      <div className="pt-2 -mt-2 pl-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          class="w-6 h-6"
        >
          <path
            fill-rule="evenodd"
            d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z"
            clip-rule="evenodd"
          />
          <path
            fill-rule="evenodd"
            d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div className="pl-14 ">
        <h1 className="-mt-4 -ml-12 text-2xl font-semibold dark:text-white ">
          Allocated Order
        </h1>
      </div>
      <span className="pt-4 -ml-24 text-medium font-medium dark:text-white ">
        23
      </span>
    </div>
  </div>
</section></Layout>;
}

export default Report;
