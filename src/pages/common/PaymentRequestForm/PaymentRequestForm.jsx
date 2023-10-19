import React, { useState } from "react";
import Layout from "../../../components/Layout/Layout";
import html2pdf from "html2pdf.js";
import Logo from "../../../assets/image/logo.png";
import Button from "../../../components/common/button/Button";
import * as api from "../../../api/proformaApi";
import { useQuery } from "react-query";
import useUserStore from "../../../store/userStore";

function PaymentRequestForm() {
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
  const [PaymentDate, setPaymentDate] = useState();
  const [PaymentDateAbrv, setPaymentDateAbrv] = useState();
  const [clientName, setClientName] = useState();
  const [clientLastName, setClientLastName] = useState();
  const [AccountNumber, setAccountNumber] = useState();
  const [Address,setAddress] = useState();
  const [Service,setService] = useState();
  const [serviceStartDate, setServiceStartDate] = useState();
  const [serviceEndDate, setServiceEndDate] = useState();
  const [keyTerms, setKeyTerms] = useState();
  const [price, setPrice] = useState();
  const [paymentMode, setPaymentMode] = useState();
  const { user, token } = useUserStore()
  // const [formData, setFormData] = useState({
  //   logo: Logo,
  //   invoiceNo: "00001/6/22",
  //   tinNo: "0011036929",
  //   date: headerDate,
  //   PaymentDate: fullDate,
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
  // if (basicInfoLoading) {
  //   return <h1>Loading ...</h1>;
  // }
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDownload = () => {
    const element = document.getElementById("download-pdf");
    const opt = {
      margin: 10,
      filename: "paymentRequest.pdf",
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

  const {
    data: basicInfo,
    isLoading: basicInfoLoading,
    isError,
  } = useQuery("basicInfo-store", () => api.GetProformaBasicInfo(token));
  if (basicInfoLoading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <>
      <div className="">
        <div id="" className="flex flex-col mx-auto w-max md:w-594">
          <div className="flex justify-end p-1">
            <img src={Logo} alt="" className=" w-40" />
          </div>

          <div className="flex flex-col items-start mb-10">
            <label className="mb-12">
              Date:{" "}
              <input
                type="text"
                className="outline-none border-b border-black bg-transparent"
                value={PaymentDate}                               
                onChange={(e) => setPaymentDate(e.target.value)}
              />
            </label>
            
            <label>
              Name:{" "}
              <input
                type="text"
                className="outline-none border-b border-black bg-transparent"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </label>

            <label>
              Address:{" "}
              <input
                type="text"
                className="outline-none border-b border-black bg-transparent"
                value={Address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>

            <label className="mb-9">
              Tin No:{" "}
              <input
                type="text"
                className="outline-none border-b border-black bg-transparent"
                value={tinNo}
                onChange={(e) => setTinNo(e.target.value)}
              />
            </label>

            <label>
              Dear :  
              <input
                type="text"
                className="outline-none border-b border-black bg-transparent placeholder-gray-400 pl-1" placeholder='last name' 
                value={clientLastName}
                onChange={(e) => setClientLastName(e.target.value)}
              />
            </label>

          </div>
          <div className="">
            <p className="leading-8">
              <label className="font-bold">RE:</label> Invoice for Account Number {" "}
              <input
                type="text"
                className="outline-none border-b border-black bg-transparent"
                value={AccountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />{" "}
              Due{" "}
              <input
                type="text"
                className="outline-none border-b border-black bg-transparent"
                value={PaymentDateAbrv}
                onChange={(e) => setPaymentDateAbrv(e.target.value)}
              /><br/><br/>
              This is to remind you that the payment of an invoice for your account number {" "}
              <input
                type="text"
                className="outline-none border-b border-black bg-transparent"
                value={AccountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
              is due on {" "}
              <input
              type="text"
              className="outline-none border-b border-black bg-transparent"
              value={PaymentDateAbrv}
              onChange={(e) => setPaymentDateAbrv(e.target.value)}
            />
            <label className="font-bold">for services of </label><br/>
            <input
              type="text"
              className="outline-none border-b border-black bg-transparent"
              value={Service}
              onChange={(e) => setService(e.target.value)}
            />.{" "}The total amount owed is {" "}
            <input
              type="text"
              className="outline-none border-b border-black bg-transparent"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
              and can be paid to the account number specified on the invoice. <br/>This payment does not include an initial down payment made.
            </p><br/>
            <p className="leading-8">
              I have attached a copy of the invoice for your reference. Please contact me if you have any questions concerning the same.{" "}
              
            </p>
            <p className="leading-9 mt-12">
              Sincerely, 
              
            </p>
            
          </div>
          <div className="flex-col flex mt-7">
            <label className="font-bold">Active Advertising</label>
            <label className="font-bold">Tin No.: {basicInfo[0].active_tin_number}</label>
          </div>
          
          <div class="mt-36 translate-y-8 mx-auto w-594 h-1 bg-gradient-to-r from-blue to-red  border-b">
            <p className="mt-3  text-xs text-blue"><label className="font-bold">Address:</label> Ghion Hotel | Stadium, Ras Desta Damtew Street, Addis Ababa</p>
            <p className="text-xs text-blue"><label className="font-bold">Telephone:</label> +251 929296548 <label className="font-bold">Email:</label> tsionee75@gmail.com <label className="font-bold">Web:</label> activeadvertising.net</p>
          </div>
          
        </div>
        <div className="flex justify-end mt-16 mb-2 -translate-x-9 -translate-y-9 md:translate-x-3 md:-translate-y-24">
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
            <img src={Logo} alt="" className="w-40" />
          </div>

          <div className="flex flex-col items-start mb-10">
            
            <label className="mb-12">
              
              {PaymentDate ? PaymentDate : "_______________"}
            </label>
            <label>
              
              {clientName ? clientName : "____________"}
            </label>
            <label>
             
              {Address ? Address : "____________"}
            </label>
            <label className="mb-9">
              
              {tinNo ? tinNo : "____________"}
            </label>
            <label>
              Dear :{" "}
              {clientLastName ? clientLastName : "____________"}
            </label>

          </div>
          <div className="">
            <p className="leading-8">
              <label className="font-bold">RE:</label> Invoice for Account Number {" "}
              {AccountNumber ? AccountNumber : "_________________"}{" "}
              Due{" "}
              {PaymentDateAbrv ? PaymentDateAbrv : "___________________"}<br/><br/>
              This is to remind you that the payment of an invoice for your account number{" "} 
               {AccountNumber ? AccountNumber : "_______________"}{" "}
               is due on {" "}
               {PaymentDateAbrv ? PaymentDateAbrv : "___________________"}{" "}
               <label className="font-bold">for services of</label>{" "}
               {Service ? Service : "_______________"}.{" "} The total amount owed is{" "}
               {price ? price : "_______________"} {" "} 
               and can be paid to the account number specified on the invoice. This payment does not include I initial down payment made.
            </p><br/>
            <p className="leading-8">
             I have attached a copy of the invoice for your reference. Please contact me if you have any questions concerning the same.{" "}
              
            </p>
            <p className="leading-9 mt-12">
              Sincerely,
              
            </p>
            
          </div>
          <div className="flex-col flex  mt-7">
            
              <label className=" font-bold mb-5">Active Adverting</label>
              <label className="font-bold pb-4">Tin No.: {basicInfo[0].active_tin_number}</label>
             
          
          </div>
          
          <div class=" mt-36 mx-auto w-562 h-1 bg-gradient-to-r from-blue to-red  border-b"></div>
           <div className="mx-auto h-16 -translate-x-5">
            <p className=" mt-1 text-xs text-blue"><label className="font-bold">Address:</label> Ghion Hotel | Stadium, Ras Desta Damtew Street, Addis Ababa</p>
            <p className="text-xs text-blue"><label className="font-bold">Telephone:</label> +251 929296548 <label className="font-bold">Email:</label> tsionee75@gmail.com <label className="font-bold">Web:</label> activeadvertising.net</p>
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

export default PaymentRequestForm;
