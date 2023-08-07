import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import html2pdf from "html2pdf.js";
import Logo from "../../../assets/image/logo.png";
import { Link, useLocation } from "react-router-dom";

import jsonData from "./Data.json";

import { FiPlus } from "react-icons/fi"; // Import the FiPlus icon
import { useTable } from "react-table";

function DeliveryForm() {
  const [data, setData] = useState(jsonData);

  const columns = React.useMemo(
    () => [
      { Header: "No", accessor: "col1" },
      { Header: "Items description", accessor: "col2" },
      { Header: "Size", accessor: "col3" },
      { Header: "Quantity", accessor: "col4" },
      { Header: "Unit price", accessor: "col5" },
      { Header: "Total", accessor: "col6" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    // Your code to fetch data from the backend goes here
    // For example:
    const fetchData = async () => {
      try {
        // Replace the URL below with your backend API endpoint
        const response = await fetch("your_backend_api_endpoint");
        const dataFromBackend = await response.json();
        setData(dataFromBackend);
      } catch (error) {
        console.error("Error fetching data from the backend:", error);
      }
    };

    fetchData();
  }, []);

  const handleDownload = () => {
    const element = document.getElementById("download-pdf");
    const opt = {
      margin: 10,
      filename: "delivery.pdf",
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
    <Layout className="">
      <div className="flex flex-col">
        <div className="flex flex-col mx-auto">
          <div className="flex justify-center p-1">
            <img src={Logo} alt="" className="w-20" />
          </div>
          <div className="flex flex-col items-end mr-16 mt-8">
            <div className="flex flex-col items-start">
              <label className="text-sm">
                <span className="text-blue">Contact</span>: +251 929 55 548
              </label>
              <label className="text-sm">
                <span className="ml-16"></span>: +251 987 197 939
              </label>
              <label className="text-sm">
                <span className="text-blue">Email</span>:
                info@activeadvertising.com
              </label>
              <label className="text-sm">
                <span className="text-blue">Tin No</span>: 0011036929
              </label>
              <label className="mb-4 text-sm">
                <span className="text-blue">Delivery Form</span>: AD00001/11/22
              </label>
              <label className="text-sm">
                <span className="text-blue">Name</span>:
                info@activeadvertising.com
              </label>
              <label className="text-sm">
                <span className="text-blue">Phone No</span>: 0011036929
              </label>
              <label className="text-sm">
                <span className="text-blue">Tin No</span>: 0011036929
              </label>
              <label className="text-sm">
                <span className="text-blue">Item Invoice No</span>:
                AD00001/11/22
              </label>
            </div>
          </div>
          <div>
            <h1 className="flex justify-center text-xl text-blue font-bold mt-10 mb-10">
              DELIVERY FORM
            </h1>
          </div>

          <div className="w-3/5 mx-auto">
            <table
              {...getTableProps()}
              className="w-full table-auto text-left "
            >
              <thead>
                {headerGroups.map((headerGroup, index) => (
                  <tr
                    key={index}
                    {...headerGroup.getHeaderGroupProps()}
                    className=""
                  >
                    {headerGroup.headers.map((column, colIdx) => (
                      <th
                        key={colIdx}
                        {...column.getHeaderProps()}
                        className={`py-3 px-2 border text-base text-blue font-roboto font-bold ${
                          colIdx === 0
                            ? "w-1/12"
                            : colIdx === 1
                            ? "w-5/12"
                            : "w-2/12"
                        }`}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row, rowIndex) => {
                  prepareRow(row);
                  return (
                    <tr
                      key={rowIndex}
                      {...row.getRowProps()}
                      //className="hover:bg-slate-200 cursor-pointer group"
                    >
                      {row.cells.map((cell, colIdx) => (
                        <td
                          key={colIdx}
                          className={`px-2 py-1 border text-sm ${
                            colIdx === 0
                              ? "w-1/12"
                              : colIdx === 1
                              ? "w-5/12"
                              : "w-2/12"
                          }`}
                        >
                          {cell.value}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between mt-10 mx-72">
            <div className="flex flex-col">
              <h3 className="text-blue text-lg">Client representative</h3>
              <label className="ml-8 font-bold">Name:____________</label>
              <label className="ml-8 font-bold">signature:____________</label>
              <label className="ml-8 font-bold">Date:_____________</label>
            </div>
            <div className="flex flex-col">
              <h3 className="text-blue text-lg">
                Active Advertising representative
              </h3>
              <label className="ml-8 font-bold">Name:____________</label>
              <label className="ml-8 font-bold">signature:____________</label>
              <label className="ml-8 font-bold">Date:_____________</label>
            </div>
          </div>
          <div className="mx-64 mt-10 mb-2">
            <p className=" text-base">
              Note:This Delivery Form is to conform that Active Advertising has
              delivered the items listed above in good manner to the requested
              receiver. This form does not imply that all payment has been made
              to Active Advertising.
            </p>
          </div>
        </div>

        {/* downloaded page that is invisible */}

        <div className="flex justify-end mt-10 mr-56">
          <button
            className="border border-blue hover:bg-blue_hover text-blue hover:text-white font-bold py-2 px-4 rounded w-32 mb-16"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>
      </div>
      <div  className="hidden">
        <div id="download-pdf" className="flex flex-col mx-auto">
          <div className="flex justify-center p-1">
            <img src={Logo} alt="" className="w-20" />
          </div>
          <div className="flex flex-col items-end mr-16 mt-8">
            <div className="flex flex-col items-start">
              <label className="text-sm">
                <span className="text-blue">Contact</span>: +251 929 55 548
              </label>
              <label className="text-sm">
                <span className="ml-16"></span>: +251 987 197 939
              </label>
              <label className="text-sm">
                <span className="text-blue">Email</span>:
                info@activeadvertising.com
              </label>
              <label className="text-sm">
                <span className="text-blue">Tin No</span>: 0011036929
              </label>
              <label className="mb-4 text-sm">
                <span className="text-blue">Delivery Form</span>: AD00001/11/22
              </label>
              <label className="text-sm">
                <span className="text-blue">Name</span>:
                info@activeadvertising.com
              </label>
              <label className="text-sm">
                <span className="text-blue">Phone No</span>: 0011036929
              </label>
              <label className="text-sm">
                <span className="text-blue">Tin No</span>: 0011036929
              </label>
              <label className="text-sm">
                <span className="text-blue">Item Invoice No</span>:
                AD00001/11/22
              </label>
            </div>
          </div>
          <div>
            <h1 className="flex justify-center text-xl text-blue font-bold mt-10 mb-10">
              DELIVERY FORM
            </h1>
          </div>

          <div className="w-4/5 mx-auto">
            <table
              {...getTableProps()}
              className="w-full table-auto text-left "
            >
              <thead>
                {headerGroups.map((headerGroup, index) => (
                  <tr
                    key={index}
                    {...headerGroup.getHeaderGroupProps()}
                    className=""
                  >
                    {headerGroup.headers.map((column, colIdx) => (
                      <th
                        key={colIdx}
                        {...column.getHeaderProps()}
                        className={`py-3 px-2 border text-base text-blue font-roboto font-bold ${
                          colIdx === 0
                            ? "w-1/12"
                            : colIdx === 1
                            ? "w-5/12"
                            : "w-2/12"
                        }`}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row, rowIndex) => {
                  prepareRow(row);
                  return (
                    <tr
                      key={rowIndex}
                      {...row.getRowProps()}
                      //className="hover:bg-slate-200 cursor-pointer group"
                    >
                      {row.cells.map((cell, colIdx) => (
                        <td
                          key={colIdx}
                          className={`px-2 py-1 border text-sm ${
                            colIdx === 0
                              ? "w-1/12"
                              : colIdx === 1
                              ? "w-5/12"
                              : "w-2/12"
                          }`}
                        >
                          {cell.value}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between mt-10 mx-16">
            <div className="flex flex-col">
              <h3 className="text-blue text-lg">Client representative</h3>
              <label className="ml-8 font-bold">Name:____________</label>
              <label className="ml-8 font-bold">signature:____________</label>
              <label className="ml-8 font-bold">Date:_____________</label>
            </div>
            <div className="flex flex-col">
              <h3 className="text-blue text-lg">
                Active Advertising representative
              </h3>
              <label className="ml-8 font-bold">Name:____________</label>
              <label className="ml-8 font-bold">signature:____________</label>
              <label className="ml-8 font-bold">Date:_____________</label>
            </div>
          </div>
          <div className="mx-16 mt-10 mb-2">
            <p className=" text-base">
              Note:This Delivery Form is to conform that Active Advertising has
              delivered the items listed above in good manner to the requested
              receiver. This form does not imply that all payment has been made
              to Active Advertising.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default DeliveryForm;
