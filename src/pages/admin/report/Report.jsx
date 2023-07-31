import React from "react";
import SideBar from "../../../components/admin/sideBar/SideBar";
import Layout from "../../../components/Layout/Layout";
import { useState } from "react";

import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto';


// import BarChart from "./components/BarChart";
// import LineChart from "C:/Users/almax/active-advertising-frontend/src/components/LineChart.js";
import{UserData} from './Data/Data'
import { JobData } from "./Data/Data1";
// import PieChart from "./components/PieChart";
import { Revenue } from "./Data/Data3";
import { BiBox } from "react-icons/bi"; 






function Report() {
  

  const [revenue, setRevenue]=useState({
    labels:Revenue.map((data)=>data.month),
    datasets:[
      {
      label:"Profit  ", 
      data:Revenue.map((data)=>data.profit),
      backgroundColor:["green",]
    },
    {
      label:"Expense ", 
      data:Revenue.map((data)=>data.expense),
      backgroundColor:["red"]
    },] 
  })




  return (<Layout>
  <div class="inline-flex flex-row">
{/* <div className="bar"><BarChart chartData={userData}/></div> */}
<div    ><Line data={revenue}/></div>
<div className=" border rounded-md p-4 bg-blue-200  shadow-md  "  >
  
      {<h1>Job completed</h1>/* Your content goes here */}
      
    </div>

{/* <div className="line"><LineChart chartData={revenue}/></div> */}
{/* <div className="pie"><PieChart chartData={userData}/></div>
<div className="bar"><BarChart chartData={jobData}/></div>
 */}





    </div>
    </Layout>
  );
}

export default Report;
