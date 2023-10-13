import React, { useMemo, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { Columns } from "./Columns";
import { Link, useNavigate } from "react-router-dom";
import * as api from "../../../api/proformaApi";
import { FaAngleUp, FaAngleDown, FaPlus } from "react-icons/fa";
import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
} from "react-icons/bi";
import Button from "../../../components/common/button/Button";
import InputField from "../../../components/common/inputField/InputField";
import useUserStore from "../../../store/userStore";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useProformaStore from "../../../store/proformaStore";
import { MdClose } from "react-icons/md";
function DesignerOrderComponent({ orderlists }) {
  const roleType = useUserStore((state) => state.user_role);
  const User = useUserStore((state) => state.User);
  const user = useUserStore();
  const navigate = useNavigate();
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => orderlists, [orderlists]);
  const [id, setId] = useState();
  const { setProformaDetail, eachOrder, eachProforma } = useProformaStore();
  const queryClient = useQueryClient();
  const [popUp, setPopUp] = useState();
  const [orderData, setOrderData] = useState();
  const [index, setIndex] = useState();
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { globalFilter, pageIndex },
  } = tableInstance;
  const {
    data: SingleOrder,
    isLoading: LoadingGetSingleOrder,
    isError,
    refetch: refetchSingleOrder,
  } = useQuery(
    ["GetSingleOrder-store", popUp],
    () => api.GetSingleOrder(user.token, index),
    {
      enabled: false, // Disable the query initially
    }
  );
  const updateOrder = (userdata) => {
    const response = api.UpdateOrder(user.token, userdata);
    return response;
  };
  const DoneOrder = useMutation(updateOrder, {
    onSuccess: async (response) => {
      await queryClient.invalidateQueries(["OrderList"]);
      await queryClient.refetchQueries({
        include: "active",
      });
      console.log("Success");
    },
  });
  const handlePopUpButton = async () => {
    setIndex(orderData.id);

    await refetchSingleOrder();
    const StatusData = {
      status: "Done",
      order_id: orderData.id,
    };
    DoneOrder.mutate(StatusData);
    setPopUp(false);

    await queryClient.invalidateQueries(["OrderList"]);
    await queryClient.refetchQueries({
      include: "active",
    });

    console.log("clicked");
  };
  const handleStatus = (data) => {
    setPopUp(true);
    setOrderData(data);
  };
  return (
    <>
      {popUp && (
        <div class="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
          <div class="w-full max-w-lg bg-white shadow-lg rounded-md px-5 py-4 relative">
            <MdClose
              size={24}
              onClick={(e) => setPopUp(false)}
              class="font-roboto font-bold cursor-pointer shrink-0 fill-black hover:fill-red-500 float-right"
            />
            <div class="my-8">
              <h4 class="text-base text-[#333] font-semibold mt-4">
                Have you successfully completed your task?
              </h4>
              <p class="text-sm text-gray-400 mt-2">
                Once you click the 'Yes' button, there's no turning back. Please
                ensure that your task is truly complete before proceeding.
              </p>
            </div>
            <div class="text-right space-x-4">
              <button
                onClick={(e) => {
                  setPopUp(false);
                }}
              
                type="button"
                class="px-6 py-2 min-w-[150px] rounded text-[#333] text-sm font-semibold border-none outline-none bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
              >
                No, cancel
              </button>
              <button
                type="button"
                onClick={() => handlePopUpButton()}
                class="px-6 py-2 min-w-[150px] rounded text-white text-sm font-semibold border-none outline-none bg-[#333] hover:bg-[#222]"
              >
                Yes, confirm
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="w-full md:pr-0">
        <div className="w-full md:flex justify-center items-center">
          <div className=" relative w-fit mb-6 text-red font-roboto font-bold text-xl ">
            <span className="mb-2px">Order List</span>
            <div className="absolute h-2px -bottom-1 left-0 w-1/2 bg-blue"></div>
          </div>
        </div>
        <div className="flex justify-between mb-3 md:grid md:grid-cols-2 md:gap-10 ">
          <div className=""></div>
          <InputField
            placeholder="Search"
            className="py-1"
            value={globalFilter || ""}
            onChange={(e) => {
              setGlobalFilter(e.target.value);
            }}
          />
        </div>
        <div className="overflow-x-auto ">
          <table {...getTableProps()} className="text-left min-w-full">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} className="">
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="py-3 px-2 border text-base text-blue font-roboto font-bold"
                    >
                      <span className="flex items-center justify-between">
                        {column.render("Header")}
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <FaAngleDown />
                          ) : (
                            <FaAngleUp />
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, rowIndex) => {
                prepareRow(row);
                return (
                  <>
                    <tr
                      {...row.getRowProps()}
                      key={rowIndex}
                      className=" cursor-pointer group"
                      // onClick={() => handleRowClick(rowIndex)}
                    >
                      {row.cells.map((cell, cellIndex) => (
                        <td
                          {...cell.getCellProps}
                          key={cellIndex}
                          className="border py-1 text-sm px-2 "
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                      {orderlists[rowIndex].status != "Done" && (
                        <td>
                          <button
                            onClick={() => handleStatus(row.original)}
                            className="bg-green font-roboto px-3 text-white rounded-md hover:bg-lime-950"
                          >
                            Done
                          </button>
                        </td>
                      )}
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex gap-2 justify-center mt-4">
          <span className="mr-5">
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            <BiChevronsLeft size={24} />
          </button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            <BiChevronLeft size={24} />
          </button>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            <BiChevronRight size={24} />
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <BiChevronsRight size={24} />
          </button>
        </div>
      </div>
    </>
  );
}

export default DesignerOrderComponent;
