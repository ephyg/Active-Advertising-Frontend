export const Columns = [
  {
    Header: "No.",
    accessor: (row, index) => index + 1, // Incremental number starting from 1
    disableSortBy: true, // Disable sorting for this column
  },
  {
    Header: "Items Description",
    accessor: "item_description",
  },
  {
    Header: "Size",
    accessor: "size",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Unit-Price",
    accessor: "unit_price",
  },

  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Order-Date",
    accessor: "formatted_created_at",
  },
];
