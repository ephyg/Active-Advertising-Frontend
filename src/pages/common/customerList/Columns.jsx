// export const Columns = [
//   {
//     Header: "No.",
//     accessor: (row, index) => index + 1,
//     disableSortBy: true,
//   },
//   {
//     Header: "Company-Name",
//     accessor: "Company-Name",
//   },
//   {
//     Header: "Tin-Number",
//     accessor: "Tin-Number",
//   },
//   {
//     Header: "Payment-Request Number",
//     accessor: "Payment-Request Number",
//   },
//   {
//     Header: "Phone Number",
//     accessor: "Phone Number",
//   },
//   {
//     Header: "Order-Date",
//     accessor: "Order-Date",
//   },
// ];
export const Columns = [
  {
    Header: "No.",
    accessor: (row, index) => index + 1,
    disableSortBy: true,
  },
  {
    Header: "Client Name",
    accessor: "client_name",
  },
  {
    Header: "Tin Number.",
    accessor: "client_tin_number",
  },
  {
    Header: "Payment-Request Number",
    accessor: "payment_request_number",
  },
  {
    Header: "Phone Number",
    accessor: "client_phone_number",
  },
  {
    Header: "Contact Person",
    accessor: "contact_person",
  },
];
