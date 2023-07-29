import React from "react";
import Layout from "../../../components/Layout/Layout";
import html2pdf from "html2pdf.js";
import Logo from "../../../assets/image/logo.png";
import Button from "../../../components/common/button/Button";

function AgreementForm() {
  const handleDownload = () => {
    const element = document.getElementById("download-pdf");
    const opt = {
      margin: 10,
      filename: "proforma.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: "mm",
        format: "a4", // You can try different formats like 'letter', 'legal', etc.
        orientation: "portrait", // 'portrait' or 'landscape'
        fontSize: 10, // Set the font size for the PDF content
      },
    };
    html2pdf().from(element).set(opt).save();
  };
  return (
    <Layout className="" >
      <div className="flex flex-col h-753 ">
        <div id="download-pdf" className="flex flex-col mx-auto w-594 h-562">
          <div className="flex justify-end p-1" > 
            <img src={Logo} alt="" className="w-20"/>
          </div>
          
          <div className="flex flex-col items-end">
            <label>Invoice No: 00001/6/22</label>
            <label>Tin No: 0011036929</label>
            <label>Date: 01/01/2022</label>
          
          </div>
          <div className="">
            <p>This agreement is made on January 1, 2022 between active advertising and <input  className="border-b border-black outline-none"></input>. Agreement for service of on invoice API00001/11/22.</p>
            <p>Key Terms of agreement: <input  className="border-b border-black outline-none"></input></p>
            <p>Delivery of service<br></br>
                    • Service start date: <input  className="border-b border-black outline-none w-24"></input><br></br>
                    • Service end date: <input  className="border-b border-black outline-none w-24"></input><br></br>
              Price: <input  className="border-b border-black outline-none w-20"></input>
            </p>
            <p>Payment Mode: <label>50%</label> down payment should be made!General Terms: Payment should be made on time for work to be completed on time.</p>
          </div>
          <div className="flex justify-between mt-8">
            <div className="flex flex-col">
              <label>Active Adverting</label>
              <input  className="border-b border-black outline-none w-24"></input>
            </div>
            <div className="flex flex-col">
              <label>Client Name</label>
              <input  className="border-b border-black outline-none w-24"></input>
            </div>
          </div>
            
          
        </div>
        <div className="flex justify-center">
          <button className="bg-blue hover:bg-blue_hover text-white font-bold py-2 px-4 rounded w-32" onClick={handleDownload}>Download</button>
        </div>
      </div>
    </Layout>
  );
}

export default AgreementForm;

