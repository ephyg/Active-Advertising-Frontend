export const Columns = [
  {
    Header: "No.",
    accessor: (row, index) => index + 1, 
    disableSortBy: true, 
  },
  {
    Header: "Company-Name",
    accessor: "Company-Name",
  },
  {
    Header: "Tin-Number",
    accessor: "Tin-Number",
  },
  {
    Header: "Payment-Request Number",
    accessor: "Payment-Request Number",
  },
  {
    Header: "Phone Number",
    accessor: "Phone Number",
  },
  {
    Header: "Address",
    accessor: "Address",
  },
  {
    Header: "Order-Date",
    accessor: "Order-Date",
  },
];
