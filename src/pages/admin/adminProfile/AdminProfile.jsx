import React from "react";
import { useUserData } from "../../../store/userStore";
import AdminProfileComponent from "./AdminProfileComponent";

function AdminProfile() {
  const currentUserDatas = useUserData();

  return (
    <div>
      {currentUserDatas && (
        <AdminProfileComponent CurrentUserData={currentUserDatas} />
      )}
    </div>
  );
}

export default AdminProfile;
