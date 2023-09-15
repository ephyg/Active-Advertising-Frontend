import React, { useMemo, useState } from "react";
import * as api from "../../../../api/proformaApi";
import Layout from "../../../../components/Layout/Layout";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { freelancerColumns } from "./freelancerColumns";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleUp, FaAngleDown, FaPlus } from "react-icons/fa";
import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
} from "react-icons/bi";
import Button from "../../../../components/common/button/Button";
import InputField from "../../../../components/common/inputField/InputField";
import { useQuery } from "react-query";
function FreelancerEmployeeComponent({ employeeFreelancerList }) {
  const navigate = useNavigate();
  const [id, setId] = useState();

  const columns = useMemo(() => freelancerColumns, []);
  const data = useMemo(() => employeeFreelancerList, [employeeFreelancerList]);

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
  const handleRowClick = async (index, row) => {
    const userId = row.original.id;
    // console.log("id", userId);
    // console.log();
    setId(userId);
    navigate(`/allocate-order/freelancer/${userId}`);
  };
  return (
    <div className="w-screen, overflow-auto">
      <div className="flex justify-between mb-3">
        <h1></h1>
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
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="hover:bg-slate-200 cursor-pointer group"
                  onClick={() => handleRowClick(index, row)}
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
    </div>
  );
}

export default FreelancerEmployeeComponent;
