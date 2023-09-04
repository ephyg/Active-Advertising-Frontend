import React, { useEffect, useState } from "react";
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
import { useMutation } from "react-query";
import { FaSpinner } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

const Forgot = () => {
  const navigate = useNavigate();
  const [forgotError, setForgotError] = useState("");
  const {
    setUser_email,
    setNotification,
    user_email,
    setSentMessage,
    sentMessage,
  } = useForgotStore();
  const forgotPassword = async (data) => {
    const response = await api.ForgotPassword(data);
    return response;
  };

  const mutation = useMutation(forgotPassword, {
    onSuccess: (response) => {
      const data = {
        user_email: values.email,
      };
      setUser_email(data);
      setSentMessage(response);
      setNotification({
        notification: 1,
      });
      navigate("/verify");
    },
  });
  const onSubmit = async (values) => {
    const data = {
      user_email: values.email,
    };
    try {
      await mutation.mutateAsync(data);
    } catch (error) {
      if (error.response.data.message == "User Not Exist") {
        setForgotError(error.response.data.message);
      } else {
        setForgotError("");
      }
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
    <div className="grid grid-cols-2 min-h-screen bg-white_blue md:grid-cols-1">
      <div className="flex justify-end items-center max-h-screen bg-login bg-cover bg-no-repeat md:hidden">
        <img src={Logo} alt="" className="w-562 mb-32" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-stretch 2xl:px-36 xl:px-32 lg:px-5 sm:px-5 md:px-5 md:min-h-screen"
      >
        <h1 className="text-5xl font-bold text-red font-roboto min-w-full text-left mb-14 md:text-4xl">
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
        {mutation.isLoading ? (
          <Button
            className=" py-2 px-16 rounded-lg w-full bg-blue hover:bg-blue_hover transition-all ease-in-out duration-300 mb-8"
            text="Sending Code"
            disabled={true}
            icon={FaSpinner}
            animation="animate-spin"
          />
        ) : (
          <Button
            className=" py-2 px-16 w-full rounded-lg bg-blue hover:bg-blue_hover transition-all ease-in-out duration-300 mb-8"
            text="Forgot"
          />
        )}
      </form>
      <ToastContainer />
    </div>
  );
};

export default Forgot;
