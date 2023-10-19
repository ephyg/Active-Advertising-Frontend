import React, { useState } from "react";
import { SideBarData } from "./SideBarData";
import { BsGraphUp } from "react-icons/bs";
import ProfilePicture from "../../../assets/image/profile.jpeg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useUserStore, { useUserData } from "../../../store/userStore";
import { BiMenu } from "react-icons/bi";
import { MdClose } from "react-icons/md";

function SideBar({ className, setIsOpen }) {
  const UserData = useUserData();
  const navigate = useNavigate();
  const location = useLocation();
  const [popUp, setPopUp] = useState(false);
  const pathName = location.pathname;
  const handlePopUp = () => {
    useUserStore.getState().logout();
    navigate("/login");
  };
  return (
    <>
      {popUp && (
        <div
          onClick={(e) => setPopUp(false)}
          class="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]"
        >
          <div class="w-full max-w-md bg-white shadow-lg rounded-md px-5 py-4 relative">
            <MdClose
              size={24}
              onClick={(e) => setPopUp(false)}
              class="font-roboto font-normal cursor-pointer shrink-0 fill-black hover:fill-red-500 float-right"
            />
            <div class="my-8 text-center">
              <h4 class="text-base font-normal mt-4">
                Are you sure you want to Logout?
              </h4>
            </div>
            <div class="text-right space-x-4"></div>
            <div class="flex flex-col space-y-4">
              <button
                type="button"
                onClick={handlePopUp}
                class="px-6 py-2 rounded text-white text-sm font-normal border-none outline-none bg-red hover:bg-red-600 active:bg-red-500"
              >
                Yes
              </button>
              <button
                type="button"
                onClick={(e) => setPopUp(false)}
                class="px-6 py-2 rounded text-black text-sm font-normal border-none outline-none bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className={`h-screen fixed w-60 bg-blue flex flex-col items-center pt-5 px-5 2xl: ${className}`}
      >
        <BiMenu
          className="absolute top-2 right-2 cursor-pointer text-white hover:text-red 2xl:hidden md:flex"
          size={30}
          onClick={() => setIsOpen(false)}
        />
        <Link to="/admin/profile">
          <div className="flex flex-col w-full items-center mb-16">
            <img
              src={UserData.user_image_url}
              className="rounded-full w-28 mb-2 border-2 border-blue_hover  h-28 bg-slate-400"
              alt=""
            />
            <h1 className="text-lg font-roboto font-normal text-white ">
              {UserData.user_first_name + " " + UserData.user_last_name}
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
                  className={`text-base font-roboto font-normal   hover:text-red ${
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
          <div onClick={(e) => setPopUp(true)}>
            <h1 className="text-base font-roboto font-normal   hover:text-red pb-7 text-white ">
              Logout
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
