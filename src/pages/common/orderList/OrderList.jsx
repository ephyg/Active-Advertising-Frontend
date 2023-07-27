import React, { useMemo } from "react";
import Layout from "../../../components/Layout/Layout";
import { useTable } from "react-table";
import DATA from "./DATA.json";
import { Columns } from "./Columns";
function OrderList() {
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => DATA, []);

  const tableInstance = useTable({
    columns,
    data,
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <Layout>
      <div>
        <h1>Order List Table</h1>
        <div>
          <table
            {...getTableProps()}
            className="w-full min-w-max table-auto text-left"
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default OrderList;
