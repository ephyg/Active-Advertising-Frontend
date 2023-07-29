export const Columns = [
  {
    Header: "No.",
    accessor: (row, index) => index + 1, // Incremental number starting from 1
    disableSortBy: true, // Disable sorting for this column
  },
  {
    Header: "Items Description",
    accessor: "Items-Description",
  },
  {
    Header: "Size",
    accessor: "Size",
  },
  {
    Header: "Quantity",
    accessor: "Quantity",
  },
  {
    Header: "Price",
    accessor: "Price",
  },
  {
    Header: "Total-Price",
    accessor: "Total-Price",
  },
  {
    Header: "Status",
    accessor: "Status",
  },
  {
    Header: "Order-Date",
    accessor: "Order-Date",
  },
  {
    Header: "Delivery-Date",
    accessor: "Delivery-Date",
  },
];
