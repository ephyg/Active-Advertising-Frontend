import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import Logo from "../../../assets/image/logo.png";
import { useNavigate, useParams } from "react-router-dom";
import useUserStore, { useUserData } from "../../../store/userStore";
import Button from "../../../components/common/button/Button";
import html2pdf from "html2pdf.js";
import * as api from "../../../api/proformaApi";
import useProformaStore from "../../../store/proformaStore";
import { useMutation, useQueryClient } from "react-query";
import { FaSpinner } from "react-icons/fa";
import { number } from "yup";
function ProformaDetailComponent({ eachOrder, eachProforma }) {
  const user = useUserStore();
  const userData = useUserData();
  const userRole = userData.user_role;
  const queryClient = useQueryClient();
  const setProformaDetail = useProformaStore(
    (state) => state.setProformaDetail
  );
  const { id } = useParams();
  const navigate = useNavigate();
  const data = {
    order: eachOrder,
    proforma: eachProforma,
  };
  const proformaMutation = (statusData) => {
    const response = api.UpdateStatus(user.token, id, statusData);
    return response;
  };
  const verifyMutation = useMutation(proformaMutation, {
    onSuccess: (response) => {
      queryClient.invalidateQueries(["proformaDetail"]);
    },
  });
  const declineMutation = useMutation(proformaMutation, {
    onSuccess: (response) => {
      queryClient.invalidateQueries(["proformaDetail"]);
    },
  });
  const cancelMutation = useMutation(proformaMutation, {
    onSuccess: (response) => {
      queryClient.invalidateQueries(["proformaDetail"]);
    },
  });

  useEffect(() => {
    const orderDetail = async () => {
      await setProformaDetail(data);
    };
    orderDetail();
  }, []);

  const contact = String(eachProforma[0].active_phone_number);
  const contactArray = contact.split(":");
  const bankAccount = String(eachProforma[0].active_account_number);
  const bankAccountArray = bankAccount.split(":");
  let subTotal = 0;
  eachOrder.map(
    (item) => (subTotal += Number(item.quantity) * Number(item.unit_price))
  );
  let tax = 15;
  let Tax = ((tax / 100) * subTotal).toFixed(2);
  let grandtedTotal = Number(Tax) + Number(subTotal);
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
  const handleRowClick = (rowId) => {
    navigate(`/order/${rowId}`);
  };
  const handleVerify = () => {
    const statusData = {
      status: "Verified",
    };
    verifyMutation.mutate(statusData);
  };
  const handleDecline = () => {
    const statusData = {
      status: "Declined",
    };
    declineMutation.mutate(statusData);
  };
  const handleCancel = () => {
    const statusData = {
      status: "Canceled",
    };
    cancelMutation.mutate(statusData);
  };
  const handleDelivery = () => {
    navigate(`/delivery/${id}`);
  };
  return (
    <Layout>
      <div className="flex relative flex-col mx-16 md:mr-0 md:ml-0 md:px-0">
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
                {contactArray.map((item, index) => (
                  <h1 className="text-sm md:text-xxs " key={index}>
                    {item}
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
                  {eachProforma[0].active_email}
                </h1>
              </div>
            </div>
            <div className="flex gap-2">
              <h1 className="font-roboto text-sm md:text-xxs text-blue ">
                Tin Number:
              </h1>
              <div className="flex flex-col">
                <h1 className="text-sm md:text-xxs ">
                  {eachProforma[0].active_tin_nUmber}
                </h1>
              </div>
            </div>
            <div className="flex gap-2">
              <h1 className="font-roboto text-sm md:text-xxs text-blue ">
                Invoice Date :
              </h1>
              <div className="flex flex-col">
                <h1 className="text-sm md:text-xxs ">
                  {eachProforma[0].invoice_date}
                </h1>
              </div>
            </div>
            <div className="flex gap-2">
              <h1 className="font-roboto text-sm md:text-xxs text-blue ">
                Account No.:
              </h1>
              <div className="flex flex-col">
                {bankAccountArray.map((item, index) => (
                  <h1 className="text-sm md:text-xxs ">{item}</h1>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-5 text-xl text-blue font-bold mb-10 md:text-base md:mb-5">
          PROFORMA INVOICE
        </div>
        <div className="flex flex-col mb-10">
          <div className="flex gap-1 items-end">
            <h1 className="font-roboto text-sm md:text-xxs text-blue">
              Payment Request No.:
            </h1>
            <div className="text-end">
              <h1 className="text-end text-sm border-b border-black">
                {eachProforma[0].payment_request_number}
              </h1>
            </div>
          </div>
          <div className="flex gap-1 items-end">
            <h1 className="font-roboto text-sm md:text-xxs text-blue ">
              Client Name:
            </h1>
            <div className="">
              <div className="text-end">
                <h1 className="text-end text-sm border-b border-black">
                  {eachProforma[0].client_name}
                </h1>
              </div>
            </div>
          </div>
          <div className="flex gap-1 items-end">
            <h1 className="font-roboto text-sm md:text-xxs text-blue ">
              Phone Number:
            </h1>
            <div className="">
              <h1 className="text-end text-sm border-b border-black">
                {eachProforma[0].client_phone_number}
              </h1>
            </div>
          </div>
          <div className="flex gap-1 items-end">
            <h1 className="font-roboto text-sm md:text-xxs text-blue ">
              Tin No.:
            </h1>
            <div className="">
              <h1 className="text-end text-sm border-b border-black">
                {eachProforma[0].client_tin_number}
              </h1>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
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
                  Vendor
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
                    {items.vendor_name}
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
        <div className="flex mt-7 justify-end">
          <div className="flex flex-col">
            <div className="flex gap-1 items-end">
              <h1 className="font-roboto text-base text-blue md:text-xs">
                Sub Total:
              </h1>
              <div className="md:text-xxs">
                <h1 className="text-end text-sm">{subTotal}</h1>
              </div>
            </div>
            <div className="flex gap-1 items-end">
              <h1 className="font-roboto text-base text-blue md:text-xs">
                Tax {tax}%:
              </h1>
              <div className="md:text-xxs">
                <h1 className="text-end text-sm ">{Tax}</h1>
              </div>
            </div>
            <div className="flex gap-1 items-end">
              <h1 className="font-roboto text-base text-blue md:text-xs">
                Grandted Total:
              </h1>
              <div className="md:text-xxs">
                <h1 className="text-end text-sm ">{grandtedTotal}</h1>
              </div>
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
              <h1 className="text-end text-sm border-b border-black">
                {eachProforma[0].price_validity}
              </h1>
            </div>
          </div>
          <div className="flex gap-1 items-end">
            <h1 className="font-roboto text-sm md:text-xxs text-blue font-">
              Payment Method
            </h1>
            <div className="">
              <h1 className="text-end text-sm border-b border-black">
                {eachProforma[0].payment_method}
              </h1>
            </div>
          </div>
          <div className="flex gap-1 items-end">
            <h1 className="font-roboto text-sm md:text-xxs text-blue font-">
              Price Including VAT:
            </h1>
            <h1 className="text-end text-sm border-b border-black">
              The price is including V.A.T {tax}
            </h1>
          </div>
          <div className="flex gap-1 items-center">
            <h1 className="font-roboto text-sm md:text-xxs text-blue font-">
              Delivery:
            </h1>

            <h1 className="text-end text-sm border-b border-black">On time</h1>
          </div>
        </div>
        <div className="flex justify-end mb-10 gap-4">
          {
            <>
              {eachProforma[0].status == "Verified" ? (
                <Button
                  text="Verified"
                  className="text-white text-lg  px-8 flex rounded-lg py-1 bg-slate-400"
                  disabled={true}
                />
              ) : eachProforma[0].status == "Completed" ? (
                <Button
                  text="Completed"
                  className="text-white text-lg  px-8 flex rounded-lg py-1 bg-rose-300"
                  disabled={true}
                />
              ) : eachProforma[0].status == "Canceled" ? (
                <Button
                  text="Canceled"
                  className="text-white text-lg  px-8 flex rounded-lg py-1 bg-rose-300"
                  disabled={true}
                />
              ) : eachProforma[0].status == "Declined" ? (
                <Button
                  text="Declined"
                  className="text-white text-lg  px-8 flex rounded-lg py-1 bg-rose-300"
                  disabled={true}
                />
              ) : (
                ""
              )}

              {userRole == "admin" ? (
                eachProforma[0].status == "Pending" ? (
                  <>
                    <Button
                      text="Decline"
                      className="text-white text-lg  px-8 flex rounded-lg py-1 bg-red hover:bg-red"
                      onClick={handleDecline}
                    />
                    {verifyMutation.isLoading ? (
                      <Button
                        text="Verifying"
                        className="text-white text-lg  px-8 flex rounded-lg py-1 bg-blue hover:bg-blue_hover"
                        onClick={handleVerify}
                        disabled={true}
                        iconSize={18}
                        icon={FaSpinner}
                        animation="animate-spin"
                      />
                    ) : (
                      <Button
                        text="Verify"
                        className="text-white text-lg  px-8 flex rounded-lg py-1 bg-blue hover:bg-blue_hover"
                        onClick={handleVerify}
                      />
                    )}
                  </>
                ) : eachProforma[0].status == "Declined" ? (
                  <Button
                    text="Verify"
                    className="text-white text-lg  px-8 flex rounded-lg py-1 bg-blue hover:bg-blue_hover"
                    onClick={handleVerify}
                  />
                ) : eachProforma[0].status == "Verified" ? (
                  <Button
                    text="Cancel"
                    className="text-white text-lg  px-8 flex rounded-lg py-1 bg-red "
                    onClick={handleCancel}
                  />
                ) : eachProforma[0].status == "Canceled" ? (
                  <Button
                    text="Verify"
                    className="text-white text-lg  px-8 flex rounded-lg py-1 bg-blue hover:bg-blue_hover"
                    onClick={handleVerify}
                  />
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              {userRole == "admin" || userRole == "account-manager" ? (
                eachProforma[0].status == "Completed" ? (
                  <Button
                    text="Delivery"
                    className="text-white text-lg  px-8 flex rounded-lg py-1 bg-blue hover:bg-blue_hover"
                    onClick={handleDelivery}
                  />
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </>
          }

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
                  {contactArray.map((item, index) => (
                    <h1 className="text-sm md:text-xxs" key={index}>
                      {item}
                    </h1>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <h1 className="font-roboto text-sm text-blue font-bold">
                  Email:
                </h1>
                <div className="flex flex-col">
                  <h1 className="text-sm md:text-xxs">
                    {eachProforma[0].active_email}
                  </h1>
                </div>
              </div>
              <div className="flex gap-2">
                <h1 className="font-roboto text-sm text-blue font-bold">
                  Tin Number:
                </h1>
                <div className="flex flex-col">
                  <h1 className="text-sm md:text-xxs ">
                    {eachProforma[0].active_tin_nUmber}
                  </h1>
                </div>
              </div>
              <div className="flex gap-2">
                <h1 className="font-roboto text-sm text-blue font-bold">
                  Invoice Date :
                </h1>
                <div className="flex flex-col">
                  <h1 className="text-sm md:text-xxs ">
                    {eachProforma[0].invoice_date}
                  </h1>
                </div>
              </div>
              <div className="flex gap-2">
                <h1 className="font-roboto text-sm text-blue font-bold">
                  Account No.:
                </h1>
                <div className="flex flex-col">
                  {bankAccountArray.map((item, index) => (
                    <h1 className="text-sm md:text-xxs ">{item}</h1>
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
              <div className="text-end">
                <h1 className="text-end text-sm border-b pb-1 border-black">
                  {eachProforma[0].payment_request_number}
                </h1>
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <h1 className="font-roboto text-sm text-blue ">Client Name:</h1>
              <div className="">
                <div className="text-end">
                  <h1 className="text-end text-sm pb-1 border-b border-black">
                    {eachProforma[0].client_name}
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <h1 className="font-roboto text-sm text-blue ">Phone Number:</h1>
              <div className="text-end">
                <h1 className="text-end text-sm pb-1 border-b border-black">
                  {eachProforma[0].client_phone_number}
                </h1>
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <h1 className="font-roboto text-sm text-blue ">Tin No.:</h1>
              <div className="text-end">
                <h1 className="text-end text-sm pb-1 border-b border-black">
                  {eachProforma[0].client_tin_number}
                </h1>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center ">
            <table class="mb-3 border-collapse  ">
              <thead class="text-blue">
                <tr className="text-center">
                  <th class="py-1 pb-3 border  px-4 text-sm text-left">No.</th>
                  <th class="py-1 pb-3 border px-4 text-sm text-left">
                    Items Description
                  </th>
                  <th class="py-1 pb-3 border px-4 text-sm text-left">Size</th>
                  <th class="py-1 pb-3 border px-4 text-sm text-left">
                    Quantity
                  </th>
                  <th class="py-1 pb-3 border px-4 text-sm text-left">Price</th>
                  <th class="py-1 pb-3 border px-4 text-sm text-left">
                    Total Price
                  </th>
                </tr>
              </thead>

              <tbody class="divide-y divide-gray-300">
                {eachOrder.map((items, index) => (
                  <tr className="pb-1">
                    <td class="py-1 pb-3 border-slate-200 border  text-sm md:text-xxs px-4">
                      <li key={index} className="list-none">
                        {index + 1}
                      </li>
                    </td>
                    <td class="py-1 pb-3 border-slate-200 border text-sm md:text-xxs px-4">
                      {items.item_description}
                    </td>
                    <td class="py-1 pb-3 border-slate-200 border text-sm md:text-xxs px-4">
                      {items.size}
                    </td>

                    <td class="py-1 pb-3 border-slate-200 border text-sm md:text-xxs px-4">
                      {items.quantity}
                    </td>
                    <td class="py-1 pb-3 border-slate-200 border text-sm md:text-xxs px-4">
                      {items.unit_price}
                    </td>
                    <td class="py-1 pb-3 border-slate-200 border text-sm md:text-xxs px-4">
                      {Number(items.quantity) * Number(items.unit_price)}
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
              <div className="">
                <h1 className="text-end text-sm pb-1 border-b border-black">
                  {eachProforma[0].price_validity}
                </h1>
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <h1 className="font-roboto text-sm text-blue font-">Payment: </h1>
              <div className="">
                <h1 className="text-end text-sm pb-1 border-b border-black">
                  {eachProforma[0].payment_method}
                </h1>
              </div>
            </div>
            <div className="flex gap-1 items-end">
              <h1 className="font-roboto text-sm text-blue font-">
                Price Including VAT:
              </h1>
              <div className="text-end text-sm pb-1 border-b border-black">
                The price is including V.A.T {tax}
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <h1 className="font-roboto text-sm text-blue font-">Delivery:</h1>
              <div className="text-end text-sm pb-1 border-b border-black">
                On time
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
export default ProformaDetailComponent;
