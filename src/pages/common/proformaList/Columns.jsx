export const Columns = [
  {
    Header: "No.",
    accessor: (row, index) => index + 1, 
    disableSortBy: true,
  },
  {
    Header: "Company Name",
    accessor: "Company Name",
  },
  {
    Header: "Order Description",
    accessor: "Order Description",
  },
  {
    Header: "Order Taker",
    accessor: "Order Taker",
  },
  {
    Header: "Tin Number",
    accessor: "Till Number",
  },
  {
    Header: "status",
    accessor: "status",
  },
  {
    Header: "order Date",
    accessor: "order Date",
  },
];
