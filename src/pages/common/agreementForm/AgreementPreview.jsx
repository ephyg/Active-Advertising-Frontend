import React from "react";
import Layout from "../../../components/Layout/Layout";
import html2pdf from "html2pdf.js";

function AgreementPreview(props) {
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
    <div className="flex flex-col h-753">
      <div id="download-pdf" className="flex flex-col mx-auto w-594 h-562">
        <div className="flex justify-end p-1">
          <img src={props.logo} alt="" className="w-20" />
        </div>

        <div className="flex flex-col items-end">
          <label>Invoice No: {props.invoiceNo}</label>
          <label>Tin No: {props.tinNo}</label>
          <label>Date: {props.date}</label>
        </div>
        <div className="">
          <p className="leading-8">
            This agreement is made on {props.agreementDate} between active
            advertising and {props.client}. Agreement for service of on invoice{" "}
            {props.invoiceNo}.
          </p>
          <p className="leading-8">Key Terms of agreement: {props.keyTerms}</p>
          <p className="leading-8">
            Delivery of service
            <br />• Service start date: {props.serviceStartDate}
            <br />• Service end date: {props.serviceEndDate}
            <br />
            Price: {props.price}
          </p>
          <p className="leading-9">
            Payment Mode: {props.paymentMode}. General Terms: Payment should be
            made on time for work to be completed on time.
          </p>
        </div>
        <div className="flex justify-between mt-8">
          <div className="flex flex-col">
            <label className="leading-8">Active Adverting</label>
            <input
              className="border-b border-black outline-none w-24"
              value={props.activeAdvert}
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <label className="leading-8">Client Name</label>
            <input
              className="border-b border-black outline-none w-24"
              value={props.clientName}
              readOnly
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="bg-blue hover:bg-blue_hover text-white font-bold py-2 px-4 rounded w-32"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default AgreementPreview;
