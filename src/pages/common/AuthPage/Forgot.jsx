import React, { useState } from "react";
import Logo from "../../../assets/image/logocopy.png";
import InputField from "../../../components/common/inputField/InputField";
import Button from "../../../components/common/button/Button";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../../../store/userStore";
import Validation from "./LoginValidation";
import { useFormik } from "formik";
import ForgotValidation from "./ForgotValidation";
import * as api from "../../../api/forgotApi";
import { ForgotPassword } from "../../../api/forgotApi";
import useForgotStore from "../../../store/forgotStore";
const Forgot = () => {
  const navigate = useNavigate();
  const [forgotError, setForgotError] = useState("");

  const onSubmit = async (values) => {
    const data = {
      user_email: values.email,
    };
    try {
      const forgotData = await api.ForgotPassword(data);
      setUser_email(data);
      console.log(data);
      navigate("/verify");
    } catch (error) {
      setForgotError(error.response.data.message);
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: ForgotValidation,
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
        <h1 className="text-5xl font-bold text-red font-roboto min-w-full text-left mb-14">
          Forgot Password
        </h1>

        <div className="flex flex-col mb-11">
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
          <h1 className="text-sm text-red font-roboto text-left mt-1">
            {forgotError}
          </h1>
        </div>
        <Button
          className=" py-2 px-16 rounded-lg bg-blue hover:bg-blue_hover transition-all ease-in-out duration-300 mb-8"
          text="Forgot"
        />
      </form>
    </div>
  );
};

export default Forgot;
