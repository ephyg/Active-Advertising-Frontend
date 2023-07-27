import React from "react";
import SideBar from "../sideBar/SideBar";

function AdminLayout({ children }) {
  return (
    <>
      <SideBar />
      <div className="pl-80">
        {children}
      </div>
    </>
  );
}

export default AdminLayout;
