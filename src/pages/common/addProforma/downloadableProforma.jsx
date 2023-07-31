import React, { useState } from "react";
import Layout from "../../../components/Layout/Layout";
import Logo from "../../../assets/image/logo.png";
import { useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import Button from "../../../components/common/button/Button";
import AddPopUp from "./AddPopUp";
import UpdatePopUp from "./UpdatePopUp";
import { data } from "autoprefixer";
import html2pdf from "html2pdf.js";
1
function Downloadable() {
  const { id } = useParams();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [dataArray, setDataArray] = useState([]);
  const [idd, setIdd] = useState();

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
    <div className="">
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
          <div className="flex gap-1 items-end">
            <h1 className="font-roboto text-sm text-blue ">
              Payment Request No.:
            </h1>
            <div className="">
              <input
                type="text"
                className="mb-1 outline-none border-b bg-transparent border-black"
              />
            </div>
          </div>
          <div className="flex gap-1 items-end">
            <h1 className="font-roboto text-sm text-blue ">Client Name:</h1>
            <div className="">
              <input
                type="text"
                className="mb-1 outline-none border-b bg-transparent border-black"
              />
            </div>
          </div>
          <div className="flex gap-1 items-end">
            <h1 className="font-roboto text-sm text-blue ">Phone Number:</h1>
            <div className="">
              <input
                type="text"
                className=" mb-1 outline-none border-b bg-transparent border-black"
              />
            </div>
          </div>
          <div className="flex gap-1 items-end">
            <h1 className="font-roboto text-sm text-blue ">Tin No.:</h1>
            <div className="">
              <input
                type="text"
                className=" mb-1 outline-none border-b bg-transparent border-black"
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
                      1
                    </li>
                  </td>
                  <td class="py-1 border-slate-200 border text-sm px-4">
                    descriptiion
                  </td>
                  <td class="py-1 border-slate-200 border text-sm px-4">
                    size
                  </td>
                  <td class="py-1 border-slate-200 border text-sm px-4">
                    quantity
                  </td>
                  <td class="py-1 border-slate-200 border text-sm px-4">
                    price
                  </td>
                  <td class="py-1 border-slate-200 border text-sm px-4">
                    total price
                  </td>
                </tr>
              ))}
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
              </tr>{" "}
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
              </tr>{" "}
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
              </tr>{" "}
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
            </tbody>
          </table>
        </div>

        <div className="flex justify-between mt-7">
          <div className="">
            <div className="flex gap-1 items-end">
              <h1 className="font-roboto text-base text-blue ">
                Payment Request No.:
              </h1>
              <div className="">
                <input
                  type="text"
                  className="mb-1 outline-none border-b bg-transparent border-black"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-1 items-end">
              <h1 className="font-roboto text-base text-blue ">Sub Total:</h1>
              <div className="">222</div>
            </div>
            <div className="flex gap-1 items-end">
              <h1 className="font-roboto text-base text-blue ">Tax:</h1>
              <div className="">15%</div>
            </div>
            <div className="flex gap-1 items-end">
              <h1 className="font-roboto text-base text-blue ">
                Grandted Total:
              </h1>
              <div className="">423</div>
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
                className="mb-1 outline-none border-b bg-transparent border-black"
              />
            </div>
          </div>
          <div className="flex gap-1 items-end">
            <h1 className="font-roboto text-sm text-blue font-">Payment</h1>
            <div className="">
              <input
                type="text"
                className="mb-1 outline-none border-b bg-transparent border-black"
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
                className=" mb-1 outline-none border-b bg-transparent border-black"
              />
            </div>
          </div>
          <div className="flex gap-1 items-end">
            <h1 className="font-roboto text-sm text-blue font-">Delivery</h1>
            <div className="">
              <input
                type="text"
                className=" mb-1 outline-none border-b bg-transparent border-black"
              />
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
  );
}
export default Downloadable;
