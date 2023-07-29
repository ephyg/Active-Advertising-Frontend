import React, { useState } from "react";
import Layout from "../../../components/Layout/Layout";
import html2pdf from "html2pdf.js";
import Logo from "../../../assets/image/logo.png";
import Button from "../../../components/common/button/Button";
import AgreementPreview from "./AgreementPreview";

function AgreementForm() {
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    logo: Logo,
    invoiceNo: "00001/6/22",
    tinNo: "0011036929",
    date: "01/01/2022",
    agreementDate: "January 1, 2022",
    client:"",
    clientName: "",
    keyTerms: "",
    serviceStartDate: "",
    serviceEndDate: "",
    price: "",
    paymentMode: "50% down payment should be made",
    activeAdvert:"",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

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

  const handlePreview = () => {
    setShowPreview(true);
  };

  return (
    <Layout className="">
      {showPreview ? (
        <AgreementPreview
          logo={formData.logo}
          invoiceNo={formData.invoiceNo}
          tinNo={formData.tinNo}
          date={formData.date}
          agreementDate={formData.agreementDate}
          client={formData.client}
          clientName={formData.clientName}
          keyTerms={formData.keyTerms}
          serviceStartDate={formData.serviceStartDate}
          serviceEndDate={formData.serviceEndDate}
          price={formData.price}
          paymentMode={formData.paymentMode}
          activeAdvert={formData.activeAdvert}
          onDownload={handleDownload}
        />
      ) : (
        <div className="flex flex-col h-753">
          <div id="download-pdf" className="flex flex-col mx-auto w-594 h-562">
            <div className="flex justify-end p-1">
              <img src={formData.logo} alt="" className="w-20" />
            </div>

            <div className="flex flex-col items-end">
              <label>Invoice No: {formData.invoiceNo}</label>
              <label>Tin No: {formData.tinNo}</label>
              <label>Date: {formData.date}</label>
            </div>
            <div className="">
              <p className="leading-8">
                This agreement is made on {formData.agreementDate} between active advertising and{" "}
                <input
                  className="border-b border-black outline-none"
                  name="client"
                  value={formData.client}
                  onChange={handleInputChange}
                />
                . Agreement for service of on invoice {formData.invoiceNo}.
              </p>
              <p className="leading-8">
                Key Terms of agreement:{" "}
                <input
                  className="border-b border-black outline-none"
                  name="keyTerms"
                  value={formData.keyTerms}
                  onChange={handleInputChange}
                />
              </p>
              <p className="leading-8">
                Delivery of service
                <br />
                • Service start date:{" "}
                <input
                  className="border-b border-black outline-none w-24"
                  name="serviceStartDate"
                  value={formData.serviceStartDate}
                  onChange={handleInputChange}
                />
                <br />
                • Service end date:{" "}
                <input
                  className="border-b border-black outline-none w-24"
                  name="serviceEndDate"
                  value={formData.serviceEndDate}
                  onChange={handleInputChange}
                />
                <br />
                Price:{" "}
                <input
                  className="border-b border-black outline-none w-20"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </p>
              <p className="leading-9">
                Payment Mode: {formData.paymentMode}. General Terms: Payment should be made on time for work to be completed on time.
              </p>
            </div>
            <div className="flex justify-between mt-8">
              <div className="flex flex-col">
                <label className="leading-8">Active Adverting</label>
                <input className="border-b border-black outline-none w-24" name="activeAdvert" value={formData.activeAdvert} onChange={handleInputChange} />
              </div>
              <div className="flex flex-col">
                <label className="leading-8">Client Name</label>
                <input
                  className="border-b border-black outline-none w-24"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-16">
            <button className="border border-blue hover:bg-blue_hover text-blue hover:text-white font-bold py-2 px-4 rounded w-32" onClick={handlePreview}>
              Preview
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default AgreementForm;

