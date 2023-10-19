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
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Order-Date",
    accessor: "created_at",
    Cell: ({ value }) => {
      const dateObject = new Date(value);
      return dateObject.toISOString().split("T")[0]; // Format the date
    },
  },
];
