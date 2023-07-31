export const Columns = [
  {
    Header: "No.",
    accessor: (row, index) => index + 1, // Incremental number starting from 1
    disableSortBy: true, // Disable sorting for this column
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
