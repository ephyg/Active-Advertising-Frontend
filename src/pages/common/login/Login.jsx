import React from "react";
import Logo from "../../../assets/image/logocopy.png";
import InputField from "../../../components/common/inputField/InputField";
import Button from "../../../components/common/button/Button";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="grid grid-cols-2 max-h-screen bg-white_blue md:grid-cols-1">
      <div className="flex justify-end items-center max-h-screen bg-login bg-cover bg-no-repeat md:hidden">
        <img src={Logo} alt="" className="w-562 mb-32" />
      </div>
      <div className="flex flex-col justify-center items-stretch px-32 md:px-5 md:min-h-screen">
        <h1 className="text-6xl font-bold text-red font-roboto min-w-full text-center mb-14">
          Login
        </h1>
        <InputField
          label="Email"
          type="text"
          placeholder="johndoe@gmail.com"
          className="mb-6"
        />
        <InputField
          label="Password"
          type="password"
          placeholder="******"
          className="mb-11"
        />
        <Link to='/order'>
          <Button
            className="px-16 rounded-lg bg-blue hover:bg-blue_hover transition-all ease-in-out duration-300 mb-8"
            text="Login"
          />
        </Link>
      </div>
    </div>
  );
};

export default Login;
