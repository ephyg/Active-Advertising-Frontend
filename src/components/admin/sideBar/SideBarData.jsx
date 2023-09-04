import { GoGraph } from "react-icons/go";
import { CgNotes } from "react-icons/cg";
import { MdBorderColor } from "react-icons/md";
import { BiSolidUserDetail } from "react-icons/bi";
import { FaUserAlt, FaHandshake } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { SiDesignernews } from "react-icons/si";
import { LuPackageSearch } from "react-icons/lu";
export const SideBarData = [
  {
    path: "/report",
    icon: GoGraph,
    title: "Report",
  },
  {
    path: "/proforma",
    icon: CgNotes,
    title: "Proforma",
  },
  {
    path: "/order",
    icon: MdBorderColor,
    title: "Order",
  },
  {
    path: "/customer",
    icon: BiSolidUserDetail,
    title: "Customer",
  },
  {
    path: "/freelancer",
    icon: FaUserAlt,
    title: "Freelancers",
  },
  {
    path: "/staffs",
    icon: HiUserGroup,
    title: "Staff",
  },
  {
    path: "/agreement",
    icon: FaHandshake,
    title: "Agreement",
  },
  {
    path: "/stock",
    icon: LuPackageSearch,
    title: "Stock",
  },
];
