import React from "react";
import { NavBarData } from "./NavBarData";
import Logo from "../../../assets/image/logo.png";
import { Link, useLocation } from "react-router-dom";
function NavBar() {
  const location = useLocation();
  const pathName = location.pathname;
  return (
    <div className="flex flex-row justify-between px-12 items-center">
      <div className="flex w-24">
        <img src={Logo} alt="" />
      </div>
      <div className="flex flex-row gap-2">
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
      </div>
    </div>
  );
}

export default NavBar;
