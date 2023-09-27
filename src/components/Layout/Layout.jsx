import React, { useState } from "react";
import NavBar from "../accountManager/navBar/NavBar";
import SideBar from "../admin/sideBar/SideBar";
import useUserStore, { useUser } from "../../store/userStore";
import { BiMenu } from "react-icons/bi";
import * as api from "../../api/userApi";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import DesignerNavBar from "../designer/navBar/NavBar";
function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = useUser();

  if (!user) {
    return <div></div>;
  }

  const roleType = user.user_role;
  return (
    <div className="bg-white_blue min-h-screen ">
      {roleType == "admin" && (
        <>
          <SideBar
            setIsOpen={setIsOpen}
            className={`${
              isOpen ? "" : "md:-translate-x-full"
            } duration-1000 z-50 md:px-10 `}
          />
          <div className="md:pl-3 pl-72 mx-4 pt-8  md:pr-3 md:pt-4">
            <BiMenu
              onClick={() => setIsOpen(true)}
              className="absolute top-4 left-2 cursor-pointer text-red hover:text-red z-40"
              size={30}
            />
            {children}
          </div>
        </>
      )}
      {roleType == "account-manager" && (
        <>
          <NavBar />
          <div className=" px-10 pt-28">{children}</div>
        </>
      )}
      {roleType !== "admin" && roleType !== "account-manager" && (
        <>
          <DesignerNavBar />
          <div className=" px-10 pt-28">{children}</div>
        </>
      )}
    </div>
  );
}

export default Layout;
