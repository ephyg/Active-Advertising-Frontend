import React from "react";
import { useUserData } from "../../../store/userStore";
import AdminProfileComponent from "./AdminProfileComponent";

function AdminProfile() {
  const currentUserDatas = useUserData();
  if (!currentUserDatas) {
    console.log(currentUserDatas);
  }
  return (
    <div>
      {currentUserDatas && (
        <AdminProfileComponent CurrentUserData={currentUserDatas} />
      )}
    </div>
  );
}

export default AdminProfile;
