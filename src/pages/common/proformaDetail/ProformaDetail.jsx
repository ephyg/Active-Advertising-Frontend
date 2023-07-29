import React, { useState } from "react";
import Layout from "../../../components/Layout/Layout";
import Logo from "../../../assets/image/logo.png";
import { useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import Button from "../../../components/common/button/Button";
import AddPopUp from "./AddPopUp";
import UpdatePopUp from "./UpdatePopUp";
function ProformaDetail() {
  const { id } = useParams();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <Layout>
      <div className="relative flex flex-col mr-16">
        <AddPopUp Open={isAddOpen} />
        {isEditOpen && <UpdatePopUp />}
        <div className="flex w-full justify-center items-center mb-5">
          <img src={Logo} className="w-28" alt="" />
        </div>
        <div className="flex flex-col items-end">
          <div className="flex flex-col">
            <div className="flex gap-2">
              <h1 className="font-roboto text-base text-blue font-bold">
                Contact:
              </h1>
              <div className="flex flex-col">
                <h1 className="text-base font-roboto">+251909901092</h1>
                <h1 className="text-base font-roboto">+251909901092</h1>
              </div>
            </div>
            <div className="flex gap-2">
              <h1 className="font-roboto text-base text-blue font-bold">
                Email:
              </h1>
              <div className="flex flex-col">
                <h1 className="text-base font-roboto">active@gmail.com</h1>
              </div>
            </div>
            <div className="flex gap-2">
              <h1 className="font-roboto text-base text-blue font-bold">
                Tin Number:
              </h1>
              <div className="flex flex-col">
                <h1 className="text-base font-roboto">0011036929</h1>
              </div>
            </div>
            <div className="flex gap-2">
              <h1 className="font-roboto text-base text-blue font-bold">
                Invoice Date :
              </h1>
              <div className="flex flex-col">
                <h1 className="text-base font-roboto">01/01/2022</h1>
              </div>
            </div>
            <div className="flex gap-2">
              <h1 className="font-roboto text-base text-blue font-bold">
                Account No.:
              </h1>
              <div className="flex flex-col">
                <h1 className="text-base font-roboto">CBE 1000015487562</h1>
                <h1 className="text-base font-roboto">CBE 1000015487562</h1>
                <h1 className="text-base font-roboto">CBE 1000015487562</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-5 text-xl text-blue font-bold mb-10">
          PROFORMA INVOICE
        </div>
        <div className="flex flex-col mb-10">
          <div className="flex gap-1 items-end">
            <h1 className="font-roboto text-base text-blue font-bold">
              Payment Request No.:
            </h1>
            <div className="">
              <input
                type="text"
                className="mb-1 outline-none border-b bg-white_blue border-black"
              />
            </div>
          </div>
          <div className="flex gap-1 items-end">
            <h1 className="font-roboto text-base text-blue font-bold">
              Client Name:
            </h1>
            <div className="">
              <input
                type="text"
                className="mb-1 outline-none border-b bg-white_blue border-black"
              />
            </div>
          </div>
          <div className="flex gap-1 items-end">
            <h1 className="font-roboto text-base text-blue font-bold">
              Phone Number:
            </h1>
            <div className="">
              <input
                type="text"
                className=" mb-1 outline-none border-b bg-white_blue border-black"
              />
            </div>
          </div>
          <div className="flex gap-1 items-end">
            <h1 className="font-roboto text-base text-blue font-bold">
              Tin No.:
            </h1>
            <div className="">
              <input
                type="text"
                className=" mb-1 outline-none border-b bg-white_blue border-black"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center px-16">
          <table class="overflow-hidden mb-3">
            <thead class="text-blue">
              <tr className="">
                <th class="py-1 border-slate-200 border-2 px-4 text-left">
                  No.
                </th>
                <th class="py-1 border-slate-200 border-2 px-4 text-left">
                  Items Description
                </th>
                <th class="py-1 border-slate-200 border-2 px-4 text-left">
                  Size
                </th>
                <th class="py-1 border-slate-200 border-2 px-4 text-left">
                  Quantity
                </th>
                <th class="py-1 border-slate-200 border-2 px-4 text-left">
                  Price
                </th>
                <th class="py-1 border-slate-200 border-2 px-4 text-left">
                  Total Price
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-300">
              <tr>
                <td class="py-1 border-slate-200 border   px-4">1</td>
                <td class="py-1 border-slate-200 border  px-4">Item 1</td>
                <td class="py-1 border-slate-200 border  px-4">Medium</td>
                <td class="py-1 border-slate-200 border  px-4">3</td>
                <td class="py-1 border-slate-200 border  px-4">$10</td>
                <td class="py-1 border-slate-200 border  px-4">$30</td>
                <td class="py-1 flex gap-2 px-4">
                  <FaEdit
                    color="green"
                    className="hover:cursor-pointer hover:scale-125"
                    size={20}
                  />
                  <TiDelete
                    color="red"
                    className="hover:cursor-pointer hover:scale-125"
                    size={24}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-end pr-8">
            <Button
              text="Add"
              className="text-white text-xs py-1 flex px-2 rounded-lg bg-blue hover:bg-blue_hover"
              onClick={() => setIsAddOpen(!isAddOpen)}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProformaDetail;
