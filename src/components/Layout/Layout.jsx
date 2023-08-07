import React from "react";
import NavBar from "../accountManager/navBar/NavBar";
import SideBar from "../admin/sideBar/SideBar";
import useUserStore from "../../store.js/store";
function Layout({ children }) {
  // const roleType = "account-manager";
  // const roleType = "admin";
  const roleType = useUserStore((state) => state.user);

  return (
    <div className="bg-white_blue min-h-screen ">
      {roleType == "admin" && (
        <>
          <SideBar />
          <div className=" pl-80 pt-8 pr-7">{children}</div>
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
 