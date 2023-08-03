import React, { useState } from "react";
import Layout from "../../../components/Layout/Layout";
import Logo from "../../../assets/image/logo.png";
import { useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import Button from "../../../components/common/button/Button";
import AddPopUp from "./AddPopUp";
import UpdatePopUp from "./UpdatePopUp";
import html2pdf from "html2pdf.js";

import { data } from "autoprefixer";
function ProformaDetail() {
  const { id } = useParams();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [dataArray, setDataArray] = useState([]);
  const [idd, setIdd] = useState();

  const [paymentRequest, setPaymentRequest] = useState();
  const [clienName, setClientName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [tinNumber, setTinNumber] = useState();
  const [vendor, setVendor] = useState("None");

  const [priceValidity, setPriceValidity] = useState();
  const [payment, setPayment] = useState();
  const [priceIncludingVat, setPriceIncludingVat] = useState();
  const [delivery, setDelivery] = useState();
  const handleDelete = (itemId) => {
    setDataArray((prevData) => {
      return prevData.filter((order) => order.id !== itemId);
    });
  };
  const handleAddOnclick = (data) => {
    setDataArray([...dataArray, data]);
  };
  const handleUpdateClick = (data) => {
    setDataArray(data);
  };
  let subTotal = 0;
  for (let index = 0; index < dataArray.length; index++) {
    subTotal += dataArray[index]["totalPrice"];
  }
  let tax = 15;
  let Tax = (tax / 100) * subTotal;
  let grandtedTotal = Tax + subTotal;
  const handleDownload = () => {
    const element = document.getElementById("download-pdf");
    const opt = {
      margin: 10,
      filename: "proforma.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: "mm",
        format: "a4", 
        orientation: "portrait", 
        fontSize: 10, 
      },
    };
    html2pdf().from(element).set(opt).save();
  };
  return (
    <Layout>
      <div className="flex relative flex-col mr-24 ml-20 px-9 py-6">
        {isAddOpen && (
          <div className="fixed inset-0 flex items-center justify-center">
            <AddPopUp
              Open={setIsAddOpen}
              onClick={handleAddOnclick}
              len={dataArray.length}
            />
          </div>
        )}
        {isEditOpen && (
          <div className="fixed inset-0 flex items-center justify-center">
            <UpdatePopUp
              Open={setIsEditOpen}
              data={dataArray}
              onClick={handleUpdateClick}
              id={idd}
            />
          </div>
        )}

        <div className="flex w-full justify-center items-center mb-5">
          <img src={Logo} className="w-28" alt="" />
        </div>
        <div className="flex flex-col items-end">
          <div className="flex flex-col">
            <div className="flex gap-2">
              <h1 className="font-roboto text-sm text-blue font-bold">
                Contact:
              </h1>
              <div className="flex flex-col">
                <h1 className="text-sm font-roboto">+251909901092</h1>
                <h1 className="text-sm font-roboto">+251909901092</h1>
              </div>
            </div>
            <div className="flex gap-2">
              <h1 className="font-roboto text-sm text-blue font-bold">
                Email:
              </h1>
              <div className="flex flex-col">
                <h1 className="text-sm font-roboto">active@gmail.com</h1>
              </div>
            </div>
            <div className="flex gap-2">
              <h1 className="font-roboto text-sm text-blue font-bold">
                Tin Number:
              </h1>
              <div className="flex flex-col">
                <h1 className="text-sm font-roboto">0011036929</h1>
              </div>
            </div>
            <div className="flex gap-2">
              <h1 className="font-roboto text-sm text-blue font-bold">
                Invoice Date :
              </h1>
              <div className="flex flex-col">
                <h1 className="text-sm font-roboto">01/01/2022</h1>
              </div>
            </div>
            <div className="flex gap-2">
              <h1 className="font-roboto text-sm text-blue font-bold">
                Account No.:
              </h1>
              <div className="flex flex-col">
                <h1 className="text-sm font-roboto">CBE 1000015487562</h1>
                <h1 className="text-sm font-roboto">CBE 1000015487562</h1>
                <h1 className="text-sm font-roboto">CBE 1000015487562</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-5 text-xl text-blue font-bold mb-10">
          PROFORMA INVOICE
        </div>
        <div className="flex flex-col mb-10">
          <div className="flex gap-1 items-end">
            <h1 className="font-roboto text-sm text-blue ">
              Payment Request No.:
            </h1>
            <div className="">
              <input
                type="text"
                className="mb-1 outline-none border-b bg-white_blue border-black"
                value={paymentRequest}
                onChange={(e) => setPaymentRequest(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-1 items-end">
            <h1 className="font-roboto text-sm text-blue ">Client Name:</h1>
            <div className="">
              <input
                type="text"
                className="mb-1 outline-none border-b bg-white_blue border-black"
                value={clienName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-1 items-end">
            <h1 className="font-roboto text-sm text-blue ">Phone Number:</h1>
            <div className="">
              <input
                type="text"
                className=" mb-1 outline-none border-b bg-white_blue border-black"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-1 items-end">
            <h1 className="font-roboto text-sm text-blue ">Tin No.:</h1>
            <div className="">
              <input
                type="text"
                className=" mb-1 outline-none border-b bg-white_blue border-black"
                value={tinNumber}
                onChange={(e) => setTinNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-1 items-end">
            <h1 className="font-roboto text-sm text-blue ">Vendor :</h1>
            <div className="">
              <input
                type="text"
                className=" mb-1 outline-none border-b bg-white_blue border-black"
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center ">
          <table class="mb-3 ">
            <thead class="text-blue">
              <tr className="">
                <th class="py-1 border-slate-200 border-2  px-4 text-sm text-left">
                  No.
                </th>
                <th class="py-1 border-slate-200 border-2 px-4 text-sm text-left">
                  Items Description
                </th>
                <th class="py-1 border-slate-200 border-2 px-4 text-sm text-left">
                  Size
                </th>
                <th class="py-1 border-slate-200 border-2 px-4 text-sm text-left">
                  Quantity
                </th>
                <th class="py-1 border-slate-200 border-2 px-4 text-sm text-left">
                  Price
                </th>
                <th class="py-1 border-slate-200 border-2 px-4 text-sm text-left">
                  Total Price
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-300">
              {dataArray.map((item, index) => (
                <tr>
                  <td class="py-1 border-slate-200 border  text-sm px-4">
                    <li key={index} className="list-none">
                      {index + 1}
                    </li>
                  </td>
                  <td class="py-1 border-slate-200 border text-sm px-4">
                    {item["itemDecription"]}
                  </td>
                  <td class="py-1 border-slate-200 border text-sm px-4">
                    {item["size"]}
                  </td>
                  <td class="py-1 border-slate-200 border text-sm px-4">
                    {item["quantity"]}
                  </td>
                  <td class="py-1 border-slate-200 border text-sm px-4">
                    {item["price"]}
                  </td>
                  <td class="py-1 border-slate-200 border text-sm px-4">
                    {item["totalPrice"]}
                  </td>
                  <td class="py-1 flex gap-2 px-4">
                    <FaEdit
                      color="green"
                      className="hover:cursor-pointer hover:scale-125"
                      size={20}
                      id={index}
                      onClick={() => {
                        setIdd(index);
                        setIsEditOpen(!isEditOpen);
                      }}
                    />

                    <TiDelete
                      color="red"
                      className="hover:cursor-pointer hover:scale-125"
                      size={24}
                      key={index}
                      id={index}
                      onClick={() => {
                        setIdd(index);
                        // setIdd(item[idd]["id"]);
                       
                        setDataArray((prevData) => {
                          const newData = [...prevData];
                          newData.splice(index, 1);
                          return newData;
                        });
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end">
          <Button
            text="+"
            className="text-white text-lg  px-9 flex rounded-lg bg-blue hover:bg-blue_hover"
            onClick={() => setIsAddOpen(!isAddOpen)}
          />
        </div>
        <div className="flex mt-7 justify-end">
          <div className="flex flex-col">
            <div className="flex gap-1 items-end">
              <h1 className="font-roboto text-base text-blue ">Sub Total:</h1>
              <div className="">{subTotal}</div>
            </div>
            <div className="flex gap-1 items-end">
              <h1 className="font-roboto text-base text-blue ">Tax 15%:</h1>
              <div className="">{Tax}</div>
            </div>
            <div className="flex gap-1 items-end">
              <h1 className="font-roboto text-base text-blue ">
                Grandted Total:
              </h1>
              <div className="">{grandtedTotal}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-10">
          <h1 className="font-roboto text-base text-blue font-bold">
            Terms and Conditions
          </h1>
          <div className="flex gap-1 items-end">
            <h1 className="font-roboto text-sm text-blue font-">
              Price Validity
            </h1>
            <div className="">
              <input
                type="text"
                className="mb-1 outline-none border-b bg-white_blue border-black"
                value={priceValidity}
                onChange={(e) => setPriceValidity(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-1 items-end">
            <h1 className="font-roboto text-sm text-blue font-">Payment</h1>
            <div className="">
              <input
                type="text"
                className="mb-1 outline-none border-b bg-white_blue border-black"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-1 items-end">
            <h1 className="font-roboto text-sm text-blue font-">
              Price Including VAT
            </h1>
            <div className="">
              <input
                type="text"
                className=" mb-1 outline-none border-b bg-white_blue border-black"
                value={priceIncludingVat}
                onChange={(e) => setPriceIncludingVat(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-1 items-end">
            <h1 className="font-roboto text-sm text-blue font-">Delivery</h1>
            <div className="">
              <input
                type="text"
                className=" mb-1 outline-none border-b bg-white_blue border-black"
                value={delivery}
                onChange={(e) => setDelivery(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end mb-10 gap-4">
          <Button
            text="Send"
            className="text-white text-lg py-1  px-8 flex rounded-lg bg-blue hover:bg-blue_hover"
          />
          <Button
            text="Download"
            className="text-white text-lg  px-8 flex rounded-lg py-1 bg-green hover:bg-green"
            onClick={handleDownload}
          />
        </div>
      </div>

      <div className="hidden">
        <div className="flex relative flex-col px-9 " id="download-pdf">
          <div className="flex w-full justify-center items-center mb-5">
            <img src={Logo} className="w-28" alt="" />
          </div>
          <div className="flex flex-col items-end">
            <div className="flex flex-col">
              <div className="flex gap-2">
                <h1 className="font-roboto text-sm text-blue font-bold">
                  Contact:
                </h1>
                <div className="flex flex-col">
                  <h1 className="text-sm font-roboto">+251909901092</h1>
                  <h1 className="text-sm font-roboto">+251909901092</h1>
                </div>
              </div>
              <div className="flex gap-2">
                <h1 className="font-roboto text-sm text-blue font-bold">
                  Email:
                </h1>
                <div className="flex flex-col">
                  <h1 className="text-sm font-roboto">active@gmail.com</h1>
                </div>
              </div>
              <div className="flex gap-2">
                <h1 className="font-roboto text-sm text-blue font-bold">
                  Tin Number:
                </h1>
                <div className="flex flex-col">
                  <h1 className="text-sm font-roboto">0011036929</h1>
                </div>
              </div>
              <div className="flex gap-2">
                <h1 className="font-roboto text-sm text-blue font-bold">
                  Invoice Date :
                </h1>
                <div className="flex flex-col">
                  <h1 className="text-sm font-roboto">01/01/2022</h1>
                </div>
              </div>
              <div className="flex gap-2">
                <h1 className="font-roboto text-sm text-blue font-bold">
                  Account No.:
                </h1>
                <div className="flex flex-col">
                  <h1 className="text-sm font-roboto">CBE 1000015487562</h1>
                  <h1 className="text-sm font-roboto">CBE 1000015487562</h1>
                  <h1 className="text-sm font-roboto">CBE 1000015487562</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-5 text-xl text-blue font-bold mb-2">
            PROFORMA INVOICE
          </div>
          <div className="flex flex-col mb-10">
            <div className="flex gap-1 items-center">
              <h1 className="font-roboto text-sm text-blue ">
                Payment Request No.:
              </h1>
              <div className="border-b border-black pl-1 pr-1 pb-1">
                {paymentRequest}
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <h1 className="font-roboto text-sm text-blue ">Client Name:</h1>
              <div className="">
                <div className="border-b border-black pl-1 pr-1 pb-1">
                  {clienName}
                </div>
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <h1 className="font-roboto text-sm text-blue ">Phone Number:</h1>
              <div className="border-b border-black pl-1 pr-1 pb-1">
                {phoneNumber}
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <h1 className="font-roboto text-sm text-blue ">Tin No.:</h1>
              <div className="border-b border-black pl-1 pr-1 pb-1">
                {tinNumber}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center ">
            <table class="mb-3 ">
              <thead class="text-blue">
                <tr className="">
                  <th class="py-1 pb-3 border-slate-200 border  px-4 text-sm text-left">
                    No.
                  </th>
                  <th class="py-1 pb-3 border-slate-200 border px-4 text-sm text-left">
                    Items Description
                  </th>
                  <th class="py-1 pb-3 border-slate-200 border px-4 text-sm text-left">
                    Size
                  </th>
                  <th class="py-1 pb-3 border-slate-200 border px-4 text-sm text-left">
                    Quantity
                  </th>
                  <th class="py-1 pb-3 border-slate-200 border px-4 text-sm text-left">
                    Price
                  </th>
                  <th class="py-1 pb-3 border-slate-200 border px-4 text-sm text-left">
                    Total Price
                  </th>
                </tr>
              </thead>

              <tbody class="divide-y divide-gray-300">
                {dataArray.map((item, index) => (
                  <tr>
                    <td class="py-1 pb-3 border-slate-200 border  text-sm px-4">
                      <li key={index} className="list-none">
                        {index + 1}
                      </li>
                    </td>
                    <td class="py-1 pb-3 border-slate-200 border text-sm px-4">
                      {item["itemDecription"]}
                    </td>
                    <td class="py-1 pb-3 border-slate-200 border text-sm px-4">
                      {item["size"]}
                    </td>
                    <td class="py-1 pb-3 border-slate-200 border text-sm px-4">
                      {item["quantity"]}
                    </td>
                    <td class="py-1 pb-3 border-slate-200 border text-sm px-4">
                      {item["price"]}
                    </td>
                    <td class="py-1 pb-3 border-slate-200 border text-sm px-4">
                      {item["totalPrice"]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mt-7">
            <div className="flex flex-col">
              <div className="flex gap-1 items-end">
                <h1 className="font-roboto text-base text-blue ">Sub Total:</h1>
                <div className="">{subTotal}</div>
              </div>
              <div className="flex gap-1 items-end">
                <h1 className="font-roboto text-base text-blue ">Tax 15%:</h1>
                <div className="">{Tax}</div>
              </div>
              <div className="flex gap-1 items-end">
                <h1 className="font-roboto text-base text-blue ">
                  Grandted Total:
                </h1>
                <div className="">{grandtedTotal}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mb-10">
            <h1 className="font-roboto text-base text-blue font-bold">
              Terms and Conditions
            </h1>
            <div className="flex gap-1 items-center">
              <h1 className="font-roboto text-sm text-blue font-">
                Price Validity:
              </h1>
              <div className="border-b border-black pl-1 pr-1 pb-1">
                {priceValidity}
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <h1 className="font-roboto text-sm text-blue font-">Payment: </h1>
              <div className="border-b border-black pl-1 pr-1 pb-1">
                {payment}
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <h1 className="font-roboto text-sm text-blue font-">
                Price Including VAT:
              </h1>
              <div className="border-b border-black pl-1 pr-1 pb-1">
                {priceIncludingVat}
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <h1 className="font-roboto text-sm text-blue font-">
                Delivery:{" "}
              </h1>
              <div className="border-b border-black pl-1 pr-1 pb-1">
                {delivery}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mb-10 gap-4">
          <Button
            text="Send"
            onClick={handleDownload}
            className="text-white text-lg py-1  px-8 flex rounded-lg bg-blue hover:bg-blue_hover"
          />
        </div>
      </div>
    </Layout>
  );
}
export default ProformaDetail;
