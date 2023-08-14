import React from "react";
import SideBar from "../../../components/admin/sideBar/SideBar";
import Layout from "../../../components/Layout/Layout";
import { useState } from "react";

import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

// import BarChart from "./components/BarChart";
// import LineChart from "C:/Users/almax/active-advertising-frontend/src/components/LineChart.js";

// import PieChart from "./components/PieChart";
import { Revenue } from "./Data/Data3";


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
      <div class="flex justify-between ">
        {/* py-6 pb-10 px-4 */}

        <div class="h-25 w-6/12  ">
          <Line data={revenue} />
        </div>
       
        <div className=" w-5/12 pr-10 bg-blue justify-end border rounded-xl p-24 shadow-md mr-12  ">
          <div className="text-center -mt-16 dark:text-white">
            <h1>Goal Completion</h1>
          </div>
         
          {/*---------------------------------------- progress bar----------------------------------------------------- */}

          <div className="-ml-12 pb-2   ">
            <div class=" flex justify-between mb-1">
              <span class="text-base font-medium text-blue dark:text-white">
                Total Reveanue
              </span>
              <span class="text-sm font-medium text-blue dark:text-white">
                500
              </span>
            </div>
            <div class="w-full bg-white rounded-full h-2.5 dark:bg-white">
              <div class="bg-red h-2.5 rounded-full w-1/2"></div>
            </div>

            <div class=" flex justify-between mb-1 pb-2">
              <span class="text-base font-medium text-blue dark:text-white">
                Total Cost
              </span>
              <span class="text-sm font-medium text-blue dark:text-white">
                300
              </span>
            </div>
            <div class="w-full bg-white rounded-full h-2.5 dark:bg-white">
              <div class="bg-red h-2.5 rounded-full w-3/4"></div>
            </div>

            <div class=" flex justify-between mb-1 pb-2">
              <span class="text-base font-medium text-blue dark:text-white">
                Total Profit
              </span>
              <span class="text-sm font-medium text-blue dark:text-white">
                200
              </span>
            </div>
            <div class="w-full bg-white rounded-full h-2.5 dark:bg-white">
              <div class="bg-red h-2.5 rounded-full w-1/2"></div>
            </div>
          </div>

          <div className="-ml-12 pb-2">
            <div class=" flex justify-between mb-1">
              <span class="text-base font-medium text-blue dark:text-white">
                Goal Completion
              </span>
              <span class="text-sm font-medium text-blue dark:text-white">
                40%
              </span>
            </div>
            <div class="w-full bg-white rounded-full h-2.5 dark:bg-white">
              <div class="bg-red h-2.5 rounded-full w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
      
         {/*---------------------------------------- information box ----------------------------------------------------- */}

      <div className=" static ... pt-10 h-48 grid grid-cols-3 gap-4  ">
        {/* <div className="w-50 h-100 border rounded-md p-4 bg-blue-200  shadow-md">1</div> */}
        <div className=" h-16 flex border rounded-md p-4 bg-blue  shadow-md w-10/12">
          {" "}
          {/* w-64 h-14 */}
          <div className="pt-2 -mt-2 pl-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              class="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
                clip-rule="evenodd"
              />
              <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
            </svg>
          </div>
          <div className="pl-20  ">
            <h1 className="-mt-4 -ml-6 text-2xl font-semibold dark:text-white ">
              customer
            </h1>
          </div>
          <span className="pt-4 -ml-16 text-medium font-medium dark:text-white ">
            23
          </span>
        </div>

        <div className=" h-16 flex border rounded-md p-4 bg-blue  shadow-md w-10/12">
          {" "}
          {/* w-64 h-14 */}
          <div className="pt-2 -mt-2 pl-3">
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
          <div className="pl-20  ">
            <h1 className="-mt-4 -ml-10 text-2xl font-semibold dark:text-white ">
              Fresh Inventory
            </h1>
          </div>
          <span className="pt-4 -ml-24 text-medium font-medium dark:text-white ">
            23
          </span>
        </div>

        <div className=" h-16 flex border rounded-md p-4 bg-blue  shadow-md w-10/12">
          {" "}
          {/* w-64 h-14 */}
          <div className="pt-2 -mt-2 pl-3">
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
          <div className="pl-20  ">
            <h1 className="-mt-4 -ml-12 text-2xl font-semibold dark:text-white ">
              Aprroved Orders
            </h1>
          </div>
          <span className="pt-4 -ml-24 text-medium font-medium dark:text-white ">
            34
          </span>
        </div>

        <div className=" h-16 flex border rounded-md p-4 bg-blue  shadow-md w-10/12">
          {" "}
          {/* w-64 h-14 */}
          <div className="pt-2 -mt-2 pl-3">
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
          <div className="pl-20  ">
            <h1 className="-mt-4 -ml-12 text-2xl font-semibold dark:text-white ">
              Deliverd Order
            </h1>
          </div>
          <span className="pt-4 -ml-24 text-medium font-medium dark:text-white ">
            17
          </span>
        </div>

        <div className=" h-16 flex border rounded-md p-4 bg-blue  shadow-md w-10/12">
          {" "}
          {/* w-64 h-14 */}
          <div className="pt-2 -mt-2 pl-3">
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
          <div className="pl-20  ">
            <h1 className="-mt-4 -ml-12 text-2xl font-semibold dark:text-white ">
              Completed Order
            </h1>
          </div>
          <span className="pt-4 -ml-24 text-medium font-medium dark:text-white ">
            23
          </span>
        </div>

        <div className=" h-16 flex border rounded-md p-4 bg-blue  shadow-md w-10/12">
          {" "}
          {/* w-64 h-14 */}
          <div className="pt-2 -mt-2 pl-3">
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
          <div className="pl-20  ">
            <h1 className="-mt-4 -ml-12 text-2xl font-semibold dark:text-white ">
              Allocated Order
            </h1>
          </div>
          <span className="pt-4 -ml-24 text-medium font-medium dark:text-white ">
            23
          </span>
        </div>

        <div className=" h-16 flex border rounded-md p-4 bg-blue  shadow-md w-10/12"> 
          {" "}
          {/* w-64 h-14 */}
          <div className="pt-2 -mt-2 pl-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              class="w-6 h-6"
            >
              <path d="M2.273 5.625A4.483 4.483 0 015.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 3H5.25a3 3 0 00-2.977 2.625zM2.273 8.625A4.483 4.483 0 015.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 6H5.25a3 3 0 00-2.977 2.625zM5.25 9a3 3 0 00-3 3v6a3 3 0 003 3h13.5a3 3 0 003-3v-6a3 3 0 00-3-3H15a.75.75 0 00-.75.75 2.25 2.25 0 01-4.5 0A.75.75 0 009 9H5.25z" />
            </svg>
          </div>
          <div className="pl-20  ">
            <h1 className="-mt-4 -ml-8 text-2xl font-semibold dark:text-white ">
              Total Order
            </h1>
          </div>
          <span className="pt-4 -ml-20 text-medium font-medium dark:text-white ">
            23
          </span>
        </div>
      </div>

      {/* <div className="line"><LineChart chartData={revenue}/></div> */}
      {/* <div className="pie"><PieChart chartData={userData}/></div>
<div className="bar"><BarChart chartData={jobData}/></div>
 */}
    </Layout>
  );
}

export default Report;
