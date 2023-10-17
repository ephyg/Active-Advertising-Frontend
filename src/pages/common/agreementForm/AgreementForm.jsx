import React, { useState } from "react";
import Layout from "../../../components/Layout/Layout";
import html2pdf from "html2pdf.js";
import Logo from "../../../assets/image/logo.png";
import Button from "../../../components/common/button/Button";
import AgreementPreview from "./AgreementPreview";
import * as api from "../../../api/proformaApi";
import { useQuery } from "react-query";
import useUserStore from "../../../store/userStore";

function AgreementForm() {
  // const { user, token } = useUserStore();
  const [showPreview, setShowPreview] = useState(false);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const monthName = months[month];
  const day = date.getDate();
  const fullDate = `${monthName} ${day}, ${year}`;
  const headerDate = `${day}/${month}/${year}`;
  const [invoiceNo, setInvoiceNo] = useState();
  const [tinNo, setTinNo] = useState();
  const [agreementDate, setAgreementDate] = useState();
  const [agreementDateAbrv, setAgreementDateAbrv] = useState();
  const [clientName, setClientName] = useState();
  const [serviceStartDate, setServiceStartDate] = useState();
  const [serviceEndDate, setServiceEndDate] = useState();
  const [keyTerms, setKeyTerms] = useState();
  const [price, setPrice] = useState();
  const [paymentMode, setPaymentMode] = useState();
  // const [formData, setFormData] = useState({
  //   logo: Logo,
  //   invoiceNo: "00001/6/22",
  //   tinNo: "0011036929",
  //   date: headerDate,
  //   agreementDate: fullDate,
  //   clientName: "",
  //   client: "",
  //   keyTerms: "",
  //   serviceStartDate: "",
  //   serviceEndDate: "",
  //   price: "",
  //   paymentMode: "50% down payment should be made",
  //   activeAdvert: "",
  // });
  // const {
  //   data: basicInfo,
  //   isLoading: basicInfoLoading,
  //   isError,
  // } = useQuery("basicInfo-store", () => api.GetProformaBasicInfo(token));

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDownload = () => {
    const element = document.getElementById("download-pdf");
    const opt = {
      margin: 10,
      filename: "agreement.pdf",
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
    <>
      <div className="">
        <div id="" className="flex flex-col mx-auto w-594">
          <div className="flex justify-end p-1">
            <img src={Logo} alt="" className="w-20" />
          </div>

          <div className="flex flex-col items-end mb-10">
            <label>
              Invoice No:{" "}
              <input
                type="text"
                className="outline-none border-b border-black bg-transparent"
                value={invoiceNo}
                onChange={(e) => setInvoiceNo(e.target.value)}
              />
            </label>

            <label>
              Date:
              <input
                type="text"
                className="outline-none border-b border-black bg-transparent"
                value={agreementDate}
                onChange={(e) => setAgreementDate(e.target.value)}
              />
            </label>
            <label>
              Tin No:
              <input
                type="text"
                className="outline-none border-b border-black bg-transparent"
                value={tinNo}
                onChange={(e) => setTinNo(e.target.value)}
              />
            </label>
          </div>
          <div className="">
            <p className="leading-8">
              This agreement is made on{" "}
              <input
                type="text"
                className="outline-none border-b border-black bg-transparent"
                value={agreementDateAbrv}
                onChange={(e) => setAgreementDateAbrv(e.target.value)}
              />{" "}
              between active advertising and{" "}
              <input
                className="border-b border-black outline-none bg-transparent"
                name="client"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
              . Agreement for service of on invoice{" "}
              <input
                type="text"
                className="outline-none border-b border-black bg-transparent"
                value={invoiceNo}
                onChange={(e) => setInvoiceNo(e.target.value)}
              />
              .
            </p>
            <p className="leading-8">
              Key Terms of agreement:{" "}
              <input
                className="border-b border-black outline-none bg-transparent"
                name="keyTerms"
                value={keyTerms}
                onChange={(e) => setKeyTerms(e.target.value)}
              />
            </p>
            <p className="leading-8">
              Delivery of service
              <br />
              <span className="ml-16">
                • Service start date:{" "}
                <input
                  className="border-b border-black outline-none w-24 bg-transparent"
                  name="serviceStartDate"
                  value={serviceStartDate}
                  onChange={(e) => setServiceStartDate(e.target.value)}
                />
              </span>
              <br />
              <span className="ml-16">
                • Service end date:{" "}
                <input
                  className="border-b p-0 border-black outline-none w-24 bg-transparent"
                  name="serviceEndDate"
                  value={serviceEndDate}
                  onChange={(e) => setServiceEndDate(e.target.value)}
                />
              </span>
              <br />
              Price:{" "}
              <input
                className="border-b border-black outline-none w-20 bg-transparent"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </p>
            <p className="leading-9">
              Payment Mode:{" "}
              <input
                className="border-b border-black outline-none w-20 bg-transparent"
                name="price"
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
              />
              .
              <p>
                General Terms: Payment should be made on time for work to be
                completed on time.
              </p>
            </p>
          </div>
          <div className="flex justify-between mt-8">
            <div className="flex flex-col">
              <label className="  mb-4">Active Adverting</label>
              <h1>__________________</h1>
            </div>
            <div className="flex flex-col">
              <label className="mb-4">Client Name</label>
              <h1>__________________</h1>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-16 mb-16">
          <button
            className="border bg-blue hover:bg-blue_hover text-white hover:text-white font-bold py-2 px-4 rounded w-32"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>
      </div>
      <div className="hidden">
        <div id="download-pdf" className="flex flex-col mx-auto w-594">
          <div className="flex justify-end p-1">
            <img src={Logo} alt="" className="w-20" />
          </div>

          <div className="flex flex-col items-end mb-10">
            <label>Invoice No: {invoiceNo ? invoiceNo : "____________"}</label>

            <label>
              Date:
              {agreementDate ? agreementDate : "_______________"}
            </label>
            <label>
              Tin No:
              {tinNo ? tinNo : "____________"}
            </label>
          </div>
          <div className="">
            <p className="leading-8">
              This agreement is made on{" "}
              {agreementDateAbrv ? agreementDateAbrv : "_________________"}{" "}
              between active advertising and{" "}
              {clientName ? clientName : "___________________"}. Agreement for
              service of on invoice {invoiceNo ? invoiceNo : "_______________"}.
            </p>
            <p className="mt-5">
              Key Terms of agreement:{" "}
              {keyTerms ? keyTerms : "_________________________"}
            </p>
            <p className="leading-8">
              Delivery of service
              <br />
              <span className="ml-16">
                • Service start date:{" "}
                {serviceStartDate ? serviceEndDate : "_________________"}
              </span>
              <br />
              <span className="ml-16">
                • Service end date:{" "}
                {serviceEndDate ? serviceEndDate : "_________________"}
              </span>
              <br />
              Price: {price ? price : "_______________"}
            </p>
            <p className="leading-9">
              Payment Mode:{" "}
              {paymentMode ? paymentMode : "________________________"}.
              <p>
                General Terms: Payment should be made on time for work to be
                completed on time.
              </p>
            </p>
          </div>
          <div className="flex justify-between mt-8">
            <div className="flex flex-col border-b border-black">
              <label className="  mb-5">Active Adverting</label>
            </div>
            <div className="flex flex-col border-b border-black">
              <label className="mb-5">Client Name</label>
              <h1>__________________</h1>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-16">
          <button
            className="border border-blue hover:bg-blue_hover text-blue hover:text-white font-bold py-2 px-4 rounded w-32"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>
      </div>
    </>
  );
}

export default AgreementForm;
