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
    Header: "Quantity",
    accessor: "Quantity",
  },
 
  {
    Header: "Unit-Price",
    accessor: "Unit-Price",
  },
  {
    Header: "Total-Price",
    accessor: "Total-Price",
  },
  {
    Header: "Unit-Measurement",
    accessor: "Unit-Measurement",
  },
  {
    Header: "Purchase-date",
    accessor: "Purchase-date",
  },
  {
    Header: "Expire-date",
    accessor: "Expire-date",
  },
  {
    Header: "Dealer-Name",
    accessor: "Dealer-Name",
  },
];
