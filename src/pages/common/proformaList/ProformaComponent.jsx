import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import DATA from "./DATA.json";
import { Columns } from "./Columns";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleUp, FaAngleDown, FaPlus } from "react-icons/fa";
import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
} from "react-icons/bi";
import Button from "../../../components/common/button/Button";
import InputField from "../../../components/common/inputField/InputField";
import * as api from "../../../api/proformaApi";
import useProformaStore from "../../../store/proformaStore";
import { useMutation, useQuery } from "react-query";
import ProformaDetail from "../ProformaDetail/ProformaDetail";
import { useNoUser } from "../../../store/userStore";
function ProformaComponent({ allProformas }) {
  const navigate = useNavigate();

  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => allProformas, [allProformas]);
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
    navigate(`/proforma/${rowId}`);
  };
  return (
    <div className=" w-full md:pr-0 mb-8">
      <div className="w-full md:flex justify-center items-center">
        <div className=" relative w-fit mb-6 text-red font-roboto font-bold text-xl ">
          <span className="mb-2px">Proforma List</span>
          <div className="absolute h-2px -bottom-1 left-0 w-1/2 bg-blue"></div>
        </div>
      </div>
      <div className="flex justify-between mb-3 md:grid md:grid-cols-2 md:gap-10 ">
        <div className="hover:bg-blue_hover flex items-center justify-between gap-2 rounded-md cursor-pointer bg-blue px-6 md:px-3 md:py-0">
          <Link to="/proforma/add">
            <Button
              text="Add Order"
              className="md:text-sm"
              icon={FaPlus}
              iconSize={12}
            />
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
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="min-w-full text-left">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="">
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="py-3 px-2 border text-sm text-blue font-roboto font-bold"
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
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="hover:bg-slate-200 cursor-pointer group"
                  onClick={() => handleRowClick(row)}
                >
                  {row.cells.map((cell, index) => (
                    <td
                      key={index}
                      {...cell.getCellProps}
                      className="border py-1 text-xs px-2 group-hover:border-slate-200"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
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
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          <BiChevronsRight size={24} />
        </button>
      </div>
    </div>
  );
}
export default ProformaComponent;
