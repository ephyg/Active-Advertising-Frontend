import React, { useState } from "react";
import Logo from "../../../assets/image/logocopy.png";
import InputField from "../../../components/common/inputField/InputField";
import Button from "../../../components/common/button/Button";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../../../store/userStore";
import * as api from "../../../api/userApi";
import { useMutation, useQuery } from "react-query";
import { Formik, useFormik } from "formik";
import LoginValidation from "./LoginValidation";

const Login = () => {
  const navigate = useNavigate();
  const [credentialError, setCredentialError] = useState("");
  const { isAuthenticated, User, token, login, user_role } = useUserStore();
  // console.log(user_role, User, token);

  const onSubmit = async (values) => {
    const data = {
      user_email: values.email,
      user_password: values.password,
    };
    try {
      const userData = await api.LoginUser(data);
      login(userData);
      user_role == "admin" ? navigate("/report") : navigate("/order");
    } catch (error) {
      setCredentialError(error.response.data.message);
    }

    // console.log(userData.json());
    // if (userData["message"] == "Invalid Credential") {
    //   setCredentialError(userData["message"]);
    // } else {
    //   login(userData);
    //   user_role == "admin" ? navigate("/report") : navigate("/order");
    // }
  };
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LoginValidation,
      onSubmit,
    });
  return (
    <div className="grid grid-cols-2 max-h-screen bg-white_blue md:grid-cols-1">
      <div className="flex justify-end items-center max-h-screen bg-login bg-cover bg-no-repeat md:hidden">
        <img src={Logo} alt="" className="w-562 mb-32" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-stretch px-32 md:px-5 md:min-h-screen"
      >
        <h1 className="text-6xl font-bold text-red font-roboto min-w-full text-center ">
          Login
        </h1>
        <h1 className="text-sm text-red font-roboto mb-8 text-center mt-7 ">
          {credentialError}
        </h1>
        <div className="flex flex-col gap-6 ">
          <InputField
            label="Email"
            type="text"
            id="email"
            name="email"
            placeholder="johndoe@gmail.com"
            className="py-2 text-lg"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email && touched.email ? errors.email : ""}
          />
          <InputField
            label="Password"
            type="password"
            id="password"
            name="password"
            placeholder="******"
            className="py-2 text-lg"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.password && touched.password ? errors.password : ""}
          />
        </div>
        <Button
          // onSubmit={handleSubmit}
          // onClick={(e) => e.preventDefault}
          className="mt-9 py-2 px-16 rounded-lg bg-blue hover:bg-blue_hover transition-all ease-in-out duration-300 "
          text="Login"
        />
        <Link to="/forgot" className=" mb-8 flex justify-center mt-2">
          <h1 className="text-sm text-gray-700 font-roboto  hover:text-red ">
            Forgot Password
          </h1>
        </Link>
      </form>
    </div>
  );
};

export default Login;
