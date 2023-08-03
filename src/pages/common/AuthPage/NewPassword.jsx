import React from "react";
import Logo from "../../../assets/image/logocopy.png";
import InputField from "../../../components/common/inputField/InputField";
import Button from "../../../components/common/button/Button";
import { Link } from "react-router-dom";
import useUserStore from "../../../store.js/store";
const NewPassword = () => {
  const user = useUserStore((state) => state.user);
  return (
    <div className="grid grid-cols-2 max-h-screen bg-white_blue md:grid-cols-1">
      <div className="flex justify-end items-center max-h-screen bg-login bg-cover bg-no-repeat md:hidden">
        <img src={Logo} alt="" className="w-562 mb-32" />
      </div>
      <div className="flex flex-col justify-center items-stretch px-32 md:px-5 md:min-h-screen">
        <h1 className="text-5xl font-bold text-red font-roboto min-w-full text-center mb-14">
          New Password
        </h1>
        <div className="flex flex-col gap-6 ">
          <InputField
            label="Password"
            type="text"
            placeholder="***********"
            className="py-2 text-lg"
          />
          <InputField
            label="Confirm"
            type="text"
            placeholder="******"
            className="py-2 text-lg"
          />
        </div>
        <Link to="/Login" className="mt-2">
          <h1 className="text-sm text-red">Login</h1>
        </Link>
        <Link to="/login" className="mt-11">
          <Button
            className=" py-2 px-16 rounded-lg bg-blue hover:bg-blue_hover transition-all ease-in-out duration-300 mb-8"
            text="Change Password"
          />
        </Link>
      </div>
    </div>
  );
};

export default NewPassword;
