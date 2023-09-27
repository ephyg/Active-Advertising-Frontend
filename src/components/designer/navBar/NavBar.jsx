import React, { useState } from "react";
import { NavBarData } from "./NavBarData";
import Logo from "../../../assets/image/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Profile from "../../../assets/image/profile.jpeg";
import Button from "../../common/button/Button";
import useUserStore, { useUserData } from "../../../store/userStore";
import { MdClose } from "react-icons/md";
function DesignerNavBar() {
  const [drop, setDrop] = useState(true);
  const location = useLocation();
  const currentUserDatas = useUserData();
  const navigate = useNavigate();
  const [popUp, setPopUp] = useState(false);
  const pathName = location.pathname;
  const handlePopUp = () => {
    useUserStore.getState().logout();
    navigate("/login");
  };
  const handleProfile = () => {
    navigate("/profile");
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
              class="font-roboto font-bold cursor-pointer shrink-0 fill-black hover:fill-red-500 float-right"
            />
            <div class="my-8 text-center">
              <h4 class="text-base font-semibold mt-4">
                Are you sure you want to Logout?
              </h4>
            </div>
            <div class="text-right space-x-4"></div>
            <div class="flex flex-col space-y-4">
              <button
                type="button"
                onClick={handlePopUp}
                class="px-6 py-2 rounded text-white text-sm font-semibold border-none outline-none bg-red hover:bg-red-600 active:bg-red-500"
              >
                Yes
              </button>
              <button
                type="button"
                onClick={(e) => setPopUp(false)}
                class="px-6 py-2 rounded text-black text-sm font-semibold border-none outline-none bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex fixed w-full bg-white_blue z-50 top-0 left-0 flex-row justify-between px-12 items-center">
        <div className="flex w-24 pt-1">
          <img src={Logo} alt="" />
        </div>
        <div className="flex flex-row gap-2 justify-end items-center">
          {NavBarData.map(({ path, title }, index) => (
            <Link to={path} key={index}>
              <h1
                className={`text-sm font-roboto font-bold   hover:text-red ${
                  pathName == path ? `text-red` : "text-blue"
                }`}
              >
                {title}
              </h1>
            </Link>
          ))}
          <div className="relative ml-2 flex flex-col w-16 h-16 bg-blue rounded-full">
            <img
              src={currentUserDatas.user_image_url}
              alt=""
              className="rounded-full  w-16 h-16 object-fill border-2 border-x-blue border-y-red "
              onClick={() => setDrop(!drop)}
            />
            <div
              className={`${
                drop ? "hidden" : ""
              } flex flex-col w-fit items-start absolute right-0 top-12 z-50 bg-white_blue shadow-md text-blue p-2 rounded`}
            >
              <h1 className="text-base font-roboto font-bold">
                {currentUserDatas.user_first_name +
                  " " +
                  currentUserDatas.user_last_name}
              </h1>
              <h1 className="text-sm mb-3">{currentUserDatas.user_email}</h1>
              <div className="flex w-full items-stretch justify-center gap-2 flex-col">
                <Button
                  className="bg-blue flex rounded px-10 text-base"
                  text="Profile"
                  onClick={handleProfile}
                />
                <Button
                  onClick={(e) => setPopUp(true)}
                  className="bg-blue flex rounded px-10"
                  text="Logout"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DesignerNavBar;
