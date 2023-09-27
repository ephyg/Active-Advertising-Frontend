import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import html2pdf from "html2pdf.js";
import Logo from "../../../assets/image/logo.png";
import { Link, useLocation, useParams } from "react-router-dom";

import jsonData from "./Data.json";

import { FiPlus } from "react-icons/fi"; // Import the FiPlus icon
import { useTable } from "react-table";
import { useQuery } from "react-query";
import Loading from "../../../assets/image/Loading.gif";
import useUserStore from "../../../store/userStore";
import * as api from "../../../api/proformaApi";

function DeliveryForm() {
  const [data, setData] = useState(jsonData);
  const user = useUserStore();
  const [delivery, setDelivery] = useState("");
  const { id } = useParams();
  const {
    data: proformaDetail,
    isLoading,
    isError,
  } = useQuery("proformaDetail", () => api.GetProforma(user.token, id));

  const handleDownload = () => {
    const element = document.getElementById("download-pdf");
    const opt = {
      margin: 10,
      filename: "delivery.pdf",
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
  if (isLoading) {
    return (
      <div className="flex bg-transparent h-screen w-full justify-center items-center">
        <img src={Loading} className="w-24 " alt="Loading..." />
      </div>
    );
  }
  const Activecontact = String(proformaDetail.proforma[0].active_phone_number);
  const ActivecontactArray = Activecontact.split(":");
  const eachOrder = proformaDetail.order;
  return (
    <Layout className="">
      <div className="flex flex-col">
        <div className="flex flex-col mx-10">
          <div className="flex justify-center p-1">
            <img src={Logo} alt="" className="w-40" />
          </div>
          <div className="flex flex-col items-end mt-8">
            <div className="flex flex-col items-start">
              <div className="flex">
                <span className="text-blue">Contact: </span>
                <div className="flex flex-col">
                  {ActivecontactArray.map((item, index) => (
                    <h1 className="text-sm md:text-xxs " key={index}>
                      {item}
                    </h1>
                  ))}
                </div>
              </div>

              <label className="text-sm">
                <span className="text-blue">Email</span>:
                {proformaDetail.proforma[0].active_email}
              </label>
              <label className="text-sm">
                <span className="text-blue">Tin No</span>:{" "}
                {proformaDetail.proforma[0].active_tin_nUmber}
              </label>
              <label className="mb-4 text-sm">
                <span className="text-blue">Delivery Form</span>:{" "}
                <input
                  type="text"
                  className="outline-none border-b border-black bg-transparent"
                  value={delivery}
                  onChange={(e) => setDelivery(e.target.value)}
                />
              </label>
              <label className="text-sm">
                <span className="text-blue">Name</span>:
                {proformaDetail.proforma[0].client_name}
              </label>
              <label className="text-sm">
                <span className="text-blue">Phone No</span>:
                {proformaDetail.proforma[0].client_phone_number}
              </label>
              <label className="text-sm">
                <span className="text-blue">Tin No</span>:{" "}
                {proformaDetail.proforma[0].client_tin_number}
              </label>
              <label className="text-sm">
                <span className="text-blue">Item Invoice No</span>:
                {proformaDetail.proforma[0].payment_request_number}
              </label>
            </div>
          </div>
          <div>
            <h1 className="flex justify-center text-xl text-blue font-bold mt-10 mb-10">
              DELIVERY FORM
            </h1>
          </div>

          <div className="">
            <table class="mb-3 min-w-full">
              <thead class="text-blue">
                <tr className="">
                  <th class="py-1 border-slate-200 border-2  px-4 text-xs md:text-xxs text-left">
                    No.
                  </th>
                  <th class="py-1 border-slate-200 border-2 px-4 text-xs md:text-xxs text-left">
                    Items Description
                  </th>
                  <th class="py-1 border-slate-200 border-2 px-4 text-xs md:text-xxs text-left">
                    Size
                  </th>

                  <th class="py-1 border-slate-200 border-2 px-4 text-xs md:text-xxs text-left">
                    Quantity
                  </th>
                  <th class="py-1 border-slate-200 border-2 px-4 text-xs md:text-xxs text-left">
                    Unit Price
                  </th>
                  <th class="py-1 border-slate-200 border-2 px-4 text-xs md:text-xxs text-left">
                    Total Price
                  </th>
                </tr>
              </thead>

              <tbody class="divide-y divide-gray-300">
                {eachOrder.map((items, index) => (
                  <tr
                    className="cursor-pointer hover:bg-slate-200"
                    onClick={() => handleRowClick(eachOrder[index].id)}
                  >
                    <td class="py-1 border-slate-200 border  text-xs md:text-xxs px-4">
                      <li key={index} className="list-none">
                        {index + 1}
                      </li>
                    </td>
                    <td class="py-1 border-slate-200 border text-xs md:text-xxs px-4">
                      {items.item_description}
                    </td>
                    <td class="py-1 border-slate-200 border text-xs md:text-xxs px-4">
                      {items.size}
                    </td>

                    <td class="py-1 border-slate-200 border text-xs md:text-xxs px-4">
                      {items.quantity}
                    </td>
                    <td class="py-1 border-slate-200 border text-xs md:text-xxs px-4">
                      {items.unit_price}
                    </td>
                    <td class="py-1 border-slate-200 border text-xs md:text-xxs px-4">
                      {Number(items.quantity) * Number(items.unit_price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between mt-10 mx-10">
            <div className="flex flex-col">
              <h3 className="text-blue text-base">Client representative</h3>
              <label className=" ">Name:________________</label>
              <label className=" ">signature:____________</label>
              <label className=" ">Date:_________________</label>
            </div>
            <div className="flex flex-col">
              <h3 className="text-blue text-base">
                Active Advertising representative
              </h3>
              <label className=" ">Name:________________</label>
              <label className=" ">signature:____________</label>
              <label className=" ">Date:_________________</label>
            </div>
          </div>
          <div className=" mt-10 mx-10 mb-2">
            <p className=" text-base">
              Note:This Delivery Form is to conform that Active Advertising has
              delivered the items listed above in good manner to the requested
              receiver. This form does not imply that all payment has been made
              to Active Advertising.
            </p>
          </div>
        </div>

        {/* downloaded page that is invisible */}

        <div className="flex justify-center mt-10">
          <button
            className="border bg-blue border-blue hover:bg-blue_hover text-white hover:text-white font-bold py-2 px-4 rounded w-32 mb-16"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>
      </div>
      <div className="hidden">
        <div id="download-pdf" className="flex flex-col mx-auto">
          <div className="flex justify-center p-1">
            <img src={Logo} alt="" className="w-40" />
          </div>
          <div className="flex flex-col items-end mt-8">
            <div className="flex flex-col items-start">
              <div className="flex">
                <span className="text-blue">Contact: </span>
                <div className="flex flex-col">
                  {ActivecontactArray.map((item, index) => (
                    <h1 className="text-sm md:text-xxs " key={index}>
                      {item}
                    </h1>
                  ))}
                </div>
              </div>

              <label className="text-sm">
                <span className="text-blue">Email</span>:
                {proformaDetail.proforma[0].active_email}
              </label>
              <label className="text-sm">
                <span className="text-blue">Tin No</span>:{" "}
                {proformaDetail.proforma[0].active_tin_nUmber}
              </label>
              <label className="mb-4 text-sm">
                <span className="text-blue">Delivery Form</span>:{delivery}
              </label>
              <label className="text-sm">
                <span className="text-blue">Name</span>:
                {proformaDetail.proforma[0].client_name}
              </label>
              <label className="text-sm">
                <span className="text-blue">Phone No</span>:
                {proformaDetail.proforma[0].client_phone_number}
              </label>
              <label className="text-sm">
                <span className="text-blue">Tin No</span>:{" "}
                {proformaDetail.proforma[0].client_tin_number}
              </label>
              <label className="text-sm">
                <span className="text-blue">Item Invoice No</span>:
                {proformaDetail.proforma[0].payment_request_number}
              </label>
            </div>
          </div>
          <div>
            <h1 className="flex justify-center text-xl text-blue font-bold mt-10 mb-10">
              DELIVERY FORM
            </h1>
          </div>

          <div className="mx-10">
            <table class="min-w-full">
              <thead class="text-blue">
                <tr className="">
                  <th class="pb-2 border-slate-200 border-2  px-4 text-xs md:text-xxs text-left">
                    No.
                  </th>
                  <th class="pb-2 border-slate-200 border-2 px-4 text-xs md:text-xxs text-left">
                    Items Description
                  </th>
                  <th class="pb-2 border-slate-200 border-2 px-4 text-xs md:text-xxs text-left">
                    Size
                  </th>

                  <th class="pb-2 border-slate-200 border-2 px-4 text-xs md:text-xxs text-left">
                    Quantity
                  </th>
                  <th class="pb-2 border-slate-200 border-2 px-4 text-xs md:text-xxs text-left">
                    Unit Price
                  </th>
                  <th class="pb-2 border-slate-200 border-2 px-4 text-xs md:text-xxs text-left">
                    Total Price
                  </th>
                </tr>
              </thead>

              <tbody class="divide-y divide-gray-300">
                {eachOrder.map((items, index) => (
                  <tr
                    className="cursor-pointer hover:bg-slate-200"
                    onClick={() => handleRowClick(eachOrder[index].id)}
                  >
                    <td class="pb-2 border-slate-200 border  text-xs md:text-xxs px-4">
                      <li key={index} className="list-none">
                        {index + 1}
                      </li>
                    </td>
                    <td class="pb-2 border-slate-200 border text-xs md:text-xxs px-4">
                      {items.item_description}
                    </td>
                    <td class="pb-2 border-slate-200 border text-xs md:text-xxs px-4">
                      {items.size}
                    </td>

                    <td class="pb-2 border-slate-200 border text-xs md:text-xxs px-4">
                      {items.quantity}
                    </td>
                    <td class="pb-2 border-slate-200 border text-xs md:text-xxs px-4">
                      {items.unit_price}
                    </td>
                    <td class="pb-2 border-slate-200 border text-xs md:text-xxs px-4">
                      {Number(items.quantity) * Number(items.unit_price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between mt-10 mx-10">
            <div className="flex flex-col">
              <h3 className="text-blue text-base">Client representative</h3>
              <label className=" ">Name:________________</label>
              <label className=" ">signature:____________</label>
              <label className=" ">Date:_________________</label>
            </div>
            <div className="flex flex-col">
              <h3 className="text-blue text-base">
                Active Advertising representative
              </h3>
              <label className=" ">Name:________________</label>
              <label className=" ">signature:____________</label>
              <label className=" ">Date:_________________</label>
            </div>
          </div>
          <div className=" mt-10 mx-10 mb-2">
            <p className=" text-base">
              Note:This Delivery Form is to conform that Active Advertising has
              delivered the items listed above in good manner to the requested
              receiver. This form does not imply that all payment has been made
              to Active Advertising.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default DeliveryForm;
