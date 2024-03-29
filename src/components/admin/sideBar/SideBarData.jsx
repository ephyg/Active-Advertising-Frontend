import { GoGraph } from "react-icons/go";
import { CgNotes } from "react-icons/cg";
import { BiSolidUserDetail } from "react-icons/bi";
import { FaUserAlt, FaHandshake } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { SiDesignernews, SiReacthookform } from "react-icons/si";
import { LuPackageSearch } from "react-icons/lu";
import {AiFillFileAdd } from "react-icons/ai";
import {PiNotePencilDuotone } from "react-icons/pi";
import {TiBusinessCard } from "react-icons/ti";

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
    path: "/form",
    icon: PiNotePencilDuotone,
    title: "Forms",
  },
  {
    path: "/stock",
    icon: LuPackageSearch,
    title: "Stock",
  },
  {
    path: "/role",
    icon: TiBusinessCard,
    title: "Add Role",
  },
];
