import React, { useMemo, useState } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
// import { Columns } from "../Columns";
import { Columns } from "./Columns";
import { Link, useNavigate } from "react-router-dom";
// import * as api from "../../../../api/proformaApi";
import { FaAngleUp, FaAngleDown, FaPlus } from "react-icons/fa";
import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
} from "react-icons/bi";
import { useQuery } from "react-query";
import InputField from "../../../../components/common/inputField/InputField";
import useUserStore from "../../../../store/userStore";
import useProformaStore from "../../../../store/proformaStore";
function StaffEmployeeComponent({ employeeList }) {
  const roleType = useUserStore((state) => state.user_role);
  const User = useUserStore();
  const user = useUserStore();
  const navigate = useNavigate();
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => employeeList, [employeeList]);
  const [id, setId] = useState();
  const { setProformaDetail, eachOrder, eachProforma } = useProformaStore();

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
    navigate(`/allocate-order/staff/${userId}`);
  };

  return (
    <div className="w-full md:pr-0">
      <div className="flex justify-between mb-3 md:grid md:grid-cols-2 md:gap-10 ">
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
                      {...cell.getCellProps}
                      key={index}
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

export default StaffEmployeeComponent;
