import React, { useState } from "react";
import { NavBarData } from "./NavBarData";
import Logo from "../../../assets/image/logo.png";
import { Link, useLocation } from "react-router-dom";
import Profile from "../../../assets/image/profile.jpeg";
import Button from "../../common/button/Button";

function NavBar() {
  const [drop, setDrop] = useState(true);
  const location = useLocation();
  const pathName = location.pathname;
  return (
    <div className="flex fixed w-full bg-white_blue z-50 top-0 left-0 flex-row justify-between px-12 items-center">
      <div className="flex w-24 pt-1">
        <img src={Logo} alt="" />
      </div>
      <div className="flex flex-row gap-2 justify-end items-center">
        {NavBarData.map(({ path, title }) => (
          <Link to={path}>
            <h1
              className={`text-sm font-roboto font-bold   hover:text-red ${
                pathName == path ? `text-red` : "text-blue"
              }`}
            >
              {title}
            </h1>
          </Link>
        ))}
        <div className="relative ml-2 flex flex-col w-12 h-12 bg-blue rounded-full">
          <img
            src={Profile}
            alt=""
            className="rounded-full border-2 border-x-blue border-y-red "
            onClick={() => setDrop(!drop)}
          />
          <div
            className={`${
              drop ? "hidden" : ""
            } flex flex-col w-fit items-start absolute right-0 top-12 z-50 bg-white_blue shadow-md text-blue p-2 rounded`}
          >
            <h1 className="text-base font-roboto font-bold">John Doe</h1>
            <h1 className="text-sm mb-3">johndoe@gmail.com</h1>
            <div className="flex w-full items-stretch justify-center gap-2 flex-col">
              <Link to="/account-manager/profile">
                <Button
                  className="bg-blue flex rounded px-10 text-base"
                  text="Profile"
                />
              </Link>
              <Link to="/login">
                <Button className="bg-blue flex rounded px-10" text="Logout" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
