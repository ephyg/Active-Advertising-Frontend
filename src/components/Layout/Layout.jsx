import React, { useState } from "react";
import NavBar from "../accountManager/navBar/NavBar";
import SideBar from "../admin/sideBar/SideBar";
import useUserStore from "../../store/userStore";
import { BiMenu } from "react-icons/bi";
function Layout({ children }) {
  // const roleType = "account-manager";
  // const roleType = "admin";
  const roleType = useUserStore((state) => state.user_role);
  const [isOpen, setIsOpen] = useState(false);
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
          <div className="md:pl-3 pl-80 pt-8 pr-7 md:pr-3 md:pt-4">
            <BiMenu
              onClick={() => setIsOpen(true)}
              className="absolute top-4 left-2 cursor-pointer text-red hover:text-red"
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
    </div>
  );
}

export default Layout;
