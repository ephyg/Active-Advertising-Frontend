import React from "react";
import NavBar from "../accountManager/navBar/NavBar";
import SideBar from "../admin/sideBar/SideBar";

function Layout({ children }) {
  const roleType = "account-manager";
//   const roleType = "admin";

  return (
    <div>
      {roleType == "admin" && (
        <>
          <SideBar />
          <div className=" pl-80">{children}</div>
        </>
      )}
      {roleType == "account-manager" && (
        <>
          <NavBar />
          <div className=" px-10">{children}</div>
        </>
      )}
    </div>
  );
}

export default Layout;
