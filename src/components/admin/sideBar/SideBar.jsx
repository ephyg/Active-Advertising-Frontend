import React from "react";
import { SideBarData } from "./SideBarData";
import { BsGraphUp } from "react-icons/bs";
import ProfilePicture from "../../../assets/image/profile.jpeg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useUserStore from "../../../store/userStore";

function SideBar() {
  const navigate=useNavigate()
  const location = useLocation();
  const pathName = location.pathname;
  const handleLogout = () => {
    useUserStore.getState().logout();
    navigate("/login");
  };
  return (
    <div className="h-screen fixed w-72 bg-blue flex flex-col items-center pt-5 px-5">
      <Link to="/admin/profile">
        <div className="flex flex-col w-full items-center  h-28 mb-16">
          <img
            src={ProfilePicture}
            className="rounded-full w-28 mb-2 border-2 border-blue_hover"
            alt=""
          />
          <h1 className="text-lg font-roboto font-bold text-white ">
            Tsion Tesfaye
          </h1>
        </div>
      </Link>
      <div className="flex flex-col items-start w-full pl-6">
        {SideBarData.map(({ icon, title, path }, index) => (
          <Link to={path}>
            <div
              key={index}
              className={`flex justify-center items-center gap-3 mb-5 hover:text-red ${
                pathName == path ? `text-red` : ""
              }`}
            >
              {React.createElement(icon, {
                size: 20,
              })}
              <h1
                className={`text-base font-roboto font-bold   hover:text-red ${
                  pathName == path ? `text-red` : "text-white"
                }`}
              >
                {title}
              </h1>
            </div>
          </Link>
        ))}
      </div>
      <div className="h-full flex items-end w-full pl-10 cursor-pointer">
        <div onClick={handleLogout}>
          <h1 className="text-base font-roboto font-bold   hover:text-red pb-7 text-white ">
            Logout
          </h1>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
