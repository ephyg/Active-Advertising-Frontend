import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { Columns } from "./Columns";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleUp, FaAngleDown, FaPlus, FaEdit } from "react-icons/fa";

import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
} from "react-icons/bi";
import Button from "../../../components/common/button/Button";
import InputField from "../../../components/common/inputField/InputField";
import { TiDelete } from "react-icons/ti";
import stockStore from "../../../store/stockStore";
import useUserStore from "../../../store/userStore";
function InventoryListComponent({ inventoryLists }) {
  const navigate = useNavigate();
  const columns = useMemo(() => Columns, []);
  const [Data, setData] = useState([]);
  const data = useMemo(() => inventoryLists, [inventoryLists]);
  const { setProformaDetail, eachItem } = stockStore();
  const user = useUserStore();
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
  const handleRowClick = (row) => {
    const rowId = row.original.id;
    navigate(`/order/${rowId}`);
  };
  return (
    <div className="pr-10 w-screen, overflow-auto">
      <div className=" relative w-fit mb-6 text-red font-roboto font-normal text-2xl ">
        <span className="mb-2px">Stock</span>
        <div className="absolute h-2px -bottom-1 left-0 w-1/2 bg-blue"></div>
      </div>
      <div className="flex justify-between mb-3">
        <div className="hover:bg-blue_hover py-1 flex items-center justify-between gap-2 rounded-md cursor-pointer bg-blue px-6">
          <Link to="/stock/addItem">
            <Button text="Add Item" icon={FaPlus} />
          </Link>
        </div>
        <InputField
          placeholder="Search"
          className="py-1"
          value={globalFilter || ""}
          onChange={(e) => {
            setGlobalFilter(e.target.value);
          }}
        />
      </div>
      <div>
        <table {...getTableProps()} className="w-full table-auto text-left ">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="">
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="py-3 px-2 border text-base text-blue font-roboto font-normal"
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
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  onClick={() => {
                    const data = {
                      eachItem: inventoryLists[index],
                    };
                    setProformaDetail(data);
                    navigate(`/stock/${inventoryLists[index].id}`);
                  }}
                  className="hover:bg-slate-200 cursor-pointer group"
                >
                  {row.cells.map((cell, index) => (
                    <td
                      key={index}
                      {...cell.getCellProps}
                      className="border py-1 text-sm px-2 group-hover:border-slate-200"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex gap-2 justify-center mt-4">
          <span className="mr-5">
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
    </div>
  );
}

export default InventoryListComponent;
