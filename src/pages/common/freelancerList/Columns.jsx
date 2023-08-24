export const Columns = [
  {
    Header: "No.",
    accessor: (row, index) => index + 1,
    disableSortBy: true,
  },
  {
    Header: "First Name",
    accessor: "freelancer_first_name",
  },
  {
    Header: "Last Name",
    accessor: "freelancer_last_name",
  },
  {
    Header: "Phone Number",
    accessor: "freelancer_phone_number",
  },
  {
    Header: "Email",
    accessor: "freelancer_email",
  },
  {
    Header: "Status",
    accessor: "freelancer_order_status",
  },
];
