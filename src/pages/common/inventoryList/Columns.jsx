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
    Header: "Quantity",
    accessor: "quantity",
  },
 
  {
    Header: "Unit-Price",
    accessor: "unit_price",
  },
  {
    Header: "Total-Price",
    accessor: "total_price",
  },
  {
    Header: "Unit-Measurement",
    accessor: "unit_measurement",
  },
  {
    Header: "Purchase-date",
    accessor: "purchase_date",
  },

  {
    Header: "Dealer-Name",
    accessor: "dealer_name",
  },
];
