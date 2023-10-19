import React, { useState } from "react";
import Layout from "../../../components/Layout/Layout";
import Logo from "../../../assets/image/logo.png";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import Button from "../../../components/common/button/Button";
import AddPopUp from "./AddPopUp";
import UpdatePopUp from "./UpdatePopUp";
import html2pdf from "html2pdf.js";
import * as api from "../../../api/proformaApi";
import { data } from "autoprefixer";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { ToastContainer, toast } from "react-toastify";
import useUserStore, { useNoUser, useUserData } from "../../../store/userStore";
function ProformaDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [dataArray, setDataArray] = useState([]);
  const [idd, setIdd] = useState();

  const [paymentRequest, setPaymentRequest] = useState("");
  const [clienName, setClientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [tinNumber, setTinNumber] = useState("");

  const [priceValidity, setPriceValidity] = useState("");
  const [payment, setPayment] = useState("");
  const [priceIncludingVat, setPriceIncludingVat] = useState("");
  const [delivery, setDelivery] = useState("");
  const { user, token } = useUserStore();
  const queryClient = useQueryClient();
  const userData = useUserData();
  const verifyProforma = (statusData) => {
    const response = api.UpdateStatus(user.token, id, statusData);
    return response;
  };
  const verifyMutation = useMutation(verifyProforma, {
    onSuccess: (response) => {
      // toast.success(response.message, {
      //   position: "top-center",
      //   toastId: "successUser",
      // });
      queryClient.invalidateQueries(["proformaDetail"]);
    },
  });
  const addProforma = (data) => {
    const response = api.AddProforma(token, data);
    return response;
  };
  const mutation = useMutation(addProforma, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allProformas"]);
      // toast.success("Proforma added successfully", {
      //   position: "top-center",
      //   toastId: "error1",
      // });
      navigate("/proforma");
    },
  });
  const {
    data: basicInfo,
    isLoading: basicInfoLoading,
    isError,
  } = useQuery("basicInfo-store", () => api.GetProformaBasicInfo(token));
  if (basicInfoLoading) {
    return <h1>Loading ...</h1>;
  }
  const contact = String(basicInfo[0].active_phone_number);
  const contactArray = contact.split(":");
  const bankAccount = String(basicInfo[0].active_account_number);
  const bankAccountArray = bankAccount.split(":");
  const currentDate = new Date();
  const date = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const today = `${year}-${month}-${date}`;

  const handleAddOnclick = (data) => {
    setDataArray([...dataArray, data]);
  };
  const handleUpdateClick = (data) => {
    setDataArray(data);
  };
  let subTotal = 0;
  let AllOrders = [];
  let totalProfit = 0;
  for (let index = 0; index < dataArray.length; index++) {
    subTotal += dataArray[index]["totalPrice"];
    totalProfit += dataArray[index]["profitPrice"];
    const order = {
      item_description: dataArray[index].itemDecription,
      size: dataArray[index].size,
      quantity: dataArray[index].quantity,
      unit_price: dataArray[index].unitPrice,
      vendor_name: dataArray[index].vendor,
    };
    AllOrders[index] = order;
  }
  const AllProformaData = {
    invoice_date: today,
    payment_request_number: paymentRequest,
    active_tin_nUmber: basicInfo[0].active_tin_number,
    active_account_number: basicInfo[0].active_account_number,
    active_vat: basicInfo[0].active_vat,
    active_phone_number: basicInfo[0].active_phone_number,
    active_email: basicInfo[0].active_email,
    client_name: clienName,
    client_tin_number: tinNumber,
    client_phone_number: phoneNumber,
    price_validity: priceValidity,
    payment_method: payment,
    status: "Pending",
    contact_person: `${
      userData.user_first_name + " " + userData.user_last_name
    }`,
    total_price: subTotal,
    total_profit: Number(totalProfit),
    orders: AllOrders,
  };

  let tax = 15;
  let Tax = (tax / 100) * subTotal;
  Tax = parseFloat(Tax.toFixed(2));
  let grandtedTotal = Tax + subTotal;

  // For Admin
  const handleVerifyProforma = (e) => {
    e.preventDefault();
    AllProformaData.status = "Verified";
    try {
      if (AllOrders.length == 0) {
        toast.error("Atleast one order is needed", {
          position: "top-center",
          toastId: "erro1",
        });
      } else {
        mutation.mutate(AllProformaData);
        navigate("/proforma");
      }
    } catch (error) {}
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    AllProformaData.status = "Verified";
    try {
      if (AllOrders.length == 0) {
        toast.error("Atleast one order is needed", {
          position: "top-center",
          toastId: "erro1",
        });
      } else {
        mutation.mutate(AllProformaData);
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
        navigate("/proforma");
      }
    } catch (error) {
      throw new error();
    }
  };
  // For Account Manager
  const SendProforma = (e) => {
    e.preventDefault();
    try {
      if (AllOrders.length == 0) {
        toast.error("Atleast one order is needed", {
          position: "top-center",
          toastId: "erro1",
        });
      } else {
        mutation.mutate(AllProformaData);
        navigate("/proforma");
      }
    } catch (error) {}
  };
  const SendAndDownloadProforma = async (e) => {
    e.preventDefault();
    try {
      if (AllOrders.length == 0) {
        toast.error("Atleast one order is needed", {
          position: "top-center",
          toastId: "erro1",
        });
      } else {
        mutation.mutate(AllProformaData);
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
        navigate("/proforma");
      }
    } catch (error) {
      throw new error();
    }
  };
  if (mutation.isLoading) {
    return <h1>Is loading</h1>;
  }

  return (
    <Layout>
      <form
        onSubmit={handleDownload}
        className="flex relative flex-col  mx-10  py-6 md:mr-0 md:ml-0 md:px-0"
      >
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
          <img src={Logo} className="w-28 md:w-20" alt="" />
        </div>
        <div className="flex flex-col items-end">
          <div className="flex flex-col">
            <div className="flex gap-2">
              <h1 className="font-roboto text-sm md:text-xxs text-blue ">
                Contact:
              </h1>
              <div className="flex flex-col">
                {contactArray.map((items, index) => (
                  <h1 className="text-sm md:text-xxs " key={index}>
                    {items}
                  </h1>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <h1 className="font-roboto text-sm md:text-xxs text-blue ">
                Email:
              </h1>
              <div className="flex flex-col">
                <h1 className="text-sm md:text-xxs">
                  {basicInfo[0].active_email}
                </h1>
              </div>
            </div>
            <div className="flex gap-2">
              <h1 className="font-roboto text-sm md:text-xxs text-blue ">
                Tin Number:
              </h1>
              <div className="flex flex-col">
                <h1 className="text-sm md:text-xxs ">
                  {basicInfo[0].active_tin_number}
                </h1>
              </div>
            </div>
            <div className="flex gap-2">
              <h1 className="font-roboto text-sm md:text-xxs text-blue ">
                Invoice Date :
              </h1>
              <div className="flex flex-col">
                <h1 className="text-sm md:text-xxs ">{today}</h1>
              </div>
            </div>
            <div className="flex gap-2">
              <h1 className="font-roboto text-sm md:text-xxs text-blue ">
                Account No.:
              </h1>
              <div className="flex flex-col">
                {bankAccountArray.map((items, index) => (
                  <h1 className="text-sm md:text-xxs " key={index}>
                    {items}
                  </h1>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-5 text-xl text-blue font-bold mb-10 md:text-base md:mb-5">
          PROFORMA INVOICE
        </div>
        <div className="flex flex-col mb-10">
          <div className="flex gap-1 items-center">
            <h1 className="font-roboto text-sm md:text-xxs text-blue ">
              Payment Request No.:
            </h1>
            <div className="">
              <input
                required
                type="text"
                className="mb-1 outline-none leading-3 border-b  bg-white_blue border-black md:h-3 md:text-xxs md:w-24"
                value={paymentRequest}
                onChange={(e) => setPaymentRequest(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <h1 className="font-roboto text-sm md:text-xxs text-blue ">
              Client Name:
            </h1>
            <div className="">
              <input
                type="text"
                required
                className="mb-1 outline-none leading-3 border-b bg-white_blue border-black md:h-3 md:text-xxs md:w-24"
                value={clienName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <h1 className="font-roboto text-sm md:text-xxs text-blue ">
              Phone Number:
            </h1>
            <div className="">
              <input
                type="text"
                required
                className=" mb-1 outline-none leading-3 border-b bg-white_blue border-black md:h-3 md:text-xxs md:w-24"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <h1 className="font-roboto text-sm md:text-xxs text-blue ">
              Tin No.:
            </h1>
            <div className="">
              <input
                type="text"
                required
                className=" mb-1 outline-none leading-3 border-b bg-white_blue border-black md:h-3 md:text-xxs md:w-24"
                value={tinNumber}
                onChange={(e) => setTinNumber(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table class="mb-3 min-w-full">
            <thead class="text-blue">
              <tr className="">
                <th class="py-1 border-slate-200 border-2  px-4 text-sm md:text-xxs text-left">
                  No.
                </th>
                <th class="py-1 border-slate-200 border-2 px-4 text-sm md:text-xxs text-left">
                  Items Description
                </th>
                <th class="py-1 border-slate-200 border-2 px-4 text-sm md:text-xxs text-left">
                  Size
                </th>
                <th class="py-1 border-slate-200 border-2 px-4 text-sm md:text-xxs text-left">
                  Vendor
                </th>
                <th class="py-1 border-slate-200 border-2 px-4 text-sm md:text-xxs text-left">
                  Quantity
                </th>
                <th class="py-1 border-slate-200 border-2 px-4 text-sm md:text-xxs text-left">
                  Price
                </th>
                <th class="py-1 border-slate-200 border-2 px-4 text-sm md:text-xxs text-left">
                  Total Price
                </th>
                <th class="py-1 border-slate-200 border-2 px-4 text-sm md:text-xxs text-left">
                  Profit
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-300">
              {dataArray.map((item, index) => (
                <tr>
                  <td class="py-1 border-slate-200 border  text-sm md:text-xxs px-4">
                    <li key={index} className="list-none">
                      {index + 1}
                    </li>
                  </td>
                  <td class="py-1 border-slate-200 border text-sm md:text-xxs px-4">
                    {item["itemDecription"]}
                  </td>
                  <td class="py-1 border-slate-200 border text-sm md:text-xxs px-4">
                    {item["size"]}
                  </td>
                  <td class="py-1 border-slate-200 border text-sm md:text-xxs px-4">
                    {item["vendor"]}
                  </td>
                  <td class="py-1 border-slate-200 border text-sm md:text-xxs px-4">
                    {item["quantity"]}
                  </td>
                  <td class="py-1 border-slate-200 border text-sm md:text-xxs px-4">
                    {item["unitPrice"]}
                  </td>
                  <td class="py-1 border-slate-200 border text-sm md:text-xxs px-4">
                    {item["totalPrice"]}
                  </td>{" "}
                  <td class="py-1 border-slate-200 border text-sm md:text-xxs px-4">
                    {item["profitPrice"]}
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
            onSubmit={(e) => e.preventDefault()}
            text="+"
            type="button"
            className="text-white text-lg  px-9 flex rounded-lg bg-blue hover:bg-blue_hover"
            onClick={() => setIsAddOpen(!isAddOpen)}
          />
        </div>
        <div className="flex mt-7 justify-end">
          <div className="flex flex-col">
            <div className="flex gap-1 items-end">
              <h1 className="font-roboto text-base text-blue md:text-xs">
                Sub Total:
              </h1>
              <div className="md:text-xxs">{subTotal}</div>
            </div>
            <div className="flex gap-1 items-end">
              <h1 className="font-roboto text-base text-blue md:text-xs">
                Tax {tax}%:
              </h1>
              <div className="md:text-xxs">{Tax}</div>
            </div>
            <div className="flex gap-1 items-end">
              <h1 className="font-roboto text-base text-blue md:text-xs">
                Granted Total:
              </h1>
              <div className="md:text-xxs">{grandtedTotal}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-10">
          <h1 className="font-roboto text-base text-blue font-bold">
            Terms and Conditions
          </h1>
          <div className="flex gap-1 items-end">
            <h1 className="font-roboto text-sm md:text-xxs text-blue font-">
              Price Validity
            </h1>
            <div className="">
              <input
                type="text"
                required
                className="mb-1 outline-none leading-3 border-b bg-white_blue border-black"
                value={priceValidity}
                onChange={(e) => setPriceValidity(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-1 items-end">
            <h1 className="font-roboto text-sm md:text-xxs text-blue font-">
              Payment
            </h1>
            <div className="">
              <input
                type="text"
                required
                className="mb-1 outline-none leading-3 border-b bg-white_blue border-black"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-1 items-end mb-1">
            <h1 className="font-roboto leading-3 text-sm md:text-xxs text-blue ">
              Price Including VAT:
            </h1>
            <div className="text-sm leading-3 md:text-xxs border-b border-black pl-1 pr-1 pb-1">
              The price is including V.A.T {tax}
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <h1 className="font-roboto text-sm md:text-xxs text-blue font-">
              Delivery:
            </h1>
            <div className="text-sm md:text-xxs border-b border-black pl-1 pr-1 pb-1">
              Delivery: on time
            </div>
          </div>
          {/* <div className="flex gap-1 items-end">
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
          </div> */}
        </div>
        {userData.user_role == "admin" && (
          <div className="flex justify-end mb-10 gap-4">
            <Button
              text="Verify"
              type="submit"
              onClick={(e) => handleVerifyProforma(e)}
              className="text-white text-lg py-1  px-8 flex rounded-lg bg-blue hover:bg-blue_hover"
            />
            <Button
              text="Verify & Download"
              type="submit"
              className="text-white text-lg  px-8 flex rounded-lg py-1 bg-green hover:bg-green"
              onClick={(e) => handleDownload(e)}
            />
          </div>
        )}
        {userData.user_role == "account-manager" && (
          <div className="flex justify-end mb-10 gap-4">
            <Button
              text="Send"
              type="submit"
              onClick={(e) => SendProforma(e)}
              className="text-white text-lg py-1  px-8 flex rounded-lg bg-blue hover:bg-blue_hover"
            />
            <Button
              text="Send & Download"
              type="submit"
              className="text-white text-lg  px-8 flex rounded-lg py-1 bg-green hover:bg-green"
              onClick={(e) => SendAndDownloadProforma(e)}
            />
          </div>
        )}
      </form>

      <form className="hidden">
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
                  {contactArray.map((items, index) => (
                    <h1 className="text-sm font-roboto" key={index}>
                      {items}
                    </h1>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <h1 className="font-roboto text-sm text-blue font-bold">
                  Email:
                </h1>
                <div className="flex flex-col">
                  <h1 className="text-sm font-roboto">
                    {basicInfo[0].active_email}
                  </h1>
                </div>
              </div>
              <div className="flex gap-2">
                <h1 className="font-roboto text-sm text-blue font-bold">
                  Tin Number:
                </h1>
                <div className="flex flex-col">
                  <h1 className="text-sm font-roboto">
                    {basicInfo[0].active_tin_number}
                  </h1>
                </div>
              </div>
              <div className="flex gap-2">
                <h1 className="font-roboto text-sm text-blue font-bold">
                  Invoice Date :
                </h1>
                <div className="flex flex-col">
                  <h1 className="text-sm font-roboto">{today}</h1>
                </div>
              </div>
              <div className="flex gap-2">
                <h1 className="font-roboto text-sm text-blue font-bold">
                  Account No.:
                </h1>
                <div className="flex flex-col">
                  {bankAccountArray.map((items, index) => (
                    <h1 className="text-sm font-roboto" key={index}>
                      {items}
                    </h1>
                  ))}
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
              <div
                className={`border-black text-sm align-text-bottom pl-1 pr-1 pb-1 ${
                  paymentRequest === "" ? "w-48 border-b" : "border-b"
                }`}
              >
                {paymentRequest === "" ? "\u00A0" : paymentRequest}
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <h1 className="font-roboto text-sm text-blue ">Client Name:</h1>
              <div className="">
                <div
                  className={`border-black text-sm align-text-bottom pl-1 pr-1 pb-1 ${
                    clienName === "" ? "w-48 border-b" : "border-b"
                  }`}
                >
                  {clienName === "" ? "\u00A0" : clienName}
                </div>
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <h1 className="font-roboto text-sm text-blue ">Phone Number:</h1>
              <div
                className={`border-black text-sm align-text-bottom pl-1 pr-1 pb-1 ${
                  phoneNumber === "" ? "w-48 border-b" : "border-b"
                }`}
              >
                {phoneNumber === "" ? "\u00A0" : phoneNumber}
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <h1 className="font-roboto text-sm text-blue ">Tin No.:</h1>
              <div
                className={`border-black text-sm align-text-bottom pl-1 pr-1 pb-1 ${
                  tinNumber === "" ? "w-48 border-b" : "border-b"
                }`}
              >
                {tinNumber === "" ? "\u00A0" : tinNumber}
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
                  Granted Total:
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
              <div
                className={`border-black text-sm align-text-bottom pl-1 pr-1 pb-1 ${
                  priceValidity === "" ? "w-48 border-b" : "border-b"
                }`}
              >
                {priceValidity === "" ? "\u00A0" : priceValidity}
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <h1 className="font-roboto text-sm text-blue font-">Payment: </h1>
              <div
                className={`border-black text-sm align-text-bottom pl-1 pr-1 pb-1 ${
                  payment === "" ? "w-48 border-b" : "border-b"
                }`}
              >
                {payment === "" ? "\u00A0" : payment}
              </div>
            </div>
            <div className="flex gap-1 items-end">
              <h1 className="font-roboto text-sm text-blue font-">
                Price Including VAT:
              </h1>
              <div className="text-sm border-black pl-1 pr-1">
                The price is including V.A.T {tax}
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <h1 className="font-roboto text-sm text-blue font-">Delivery:</h1>
              <div className="text-sm border-black pl-1 pr-1">
                Delivery: on time
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
      </form>
      <ToastContainer />
    </Layout>
  );
}
export default ProformaDetail;
