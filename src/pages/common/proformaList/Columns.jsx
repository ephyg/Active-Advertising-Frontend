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
    Header: "Payment Request No.",
    accessor: "payment_request_number",
  },
  {
    Header: "Order Taker",
    accessor: "contact_person",
  },
  {
    Header: "Tin Number",
    accessor: "client_tin_number",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "order Date",
    accessor: "formatted_created_at",
  },
];
