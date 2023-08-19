import React, { useEffect, useState } from "react";
import Logo from "../../../assets/image/logocopy.png";
import InputField from "../../../components/common/inputField/InputField";
import Button from "../../../components/common/button/Button";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../../../store/userStore";
import * as api from "../../../api/forgotApi";
import Validation from "./LoginValidation";
import { useFormik } from "formik";
import NewPasswordValidation from "./NewPasswordConfirmation";
import useForgotStore from "../../../store/forgotStore";
import { useMutation } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
const NewPassword = () => {
  const [forgotError, setForgotError] = useState("");
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const {
    setUser_email,
    setVerification,
    user_email,
    setSentMessage,
    sentMessage,
    notification,
    setNotification,
    verification,
  } = useForgotStore();
  useEffect(() => {
    if (!verification) {
      navigate("/forgot");
    }
  }, []);
  useEffect(() => {
    if (notification == 2) {
      toast.success(sentMessage, {
        position: "top-left",
        toastId: "success2",
      });
    }
    setNotification({
      notification: null,
    });
  }, []);
  const newPassword = async (data) => {
    const response = await api.NewPassword(data);
    return response;
  };
  const mutation = useMutation(newPassword, {
    onSuccess: (response) => {
      const data = {
        user_email: null,
        verification: null,
      };
      setUser_email(data);
      setVerification(data);
      setSentMessage(response);
      setNotification({
        notification: 3,
      });
      navigate("/login");
    },
  });
  const onSubmit = async (values) => {
    const data = {
      user_email: user_email,
      user_password: values.user_password,
    };
    try {
      await mutation.mutateAsync(data);
    } catch (error) {
      setForgotError("");
    }
  };
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        user_password: "",
        user_confirm: "",
      },
      validationSchema: NewPasswordValidation,
      onSubmit,
    });
  return (
    <div className="grid grid-cols-2 max-h-screen bg-white_blue md:grid-cols-1">
      <div className="flex justify-end items-center max-h-screen bg-login bg-cover bg-no-repeat md:hidden">
        <img src={Logo} alt="" className="w-562 mb-32" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-stretch 2xl:px-36 xl:px-32 lg:px-5 sm:px-5 md:px-5 md:min-h-screen"
      >
        <h1 className="text-5xl font-bold text-red font-roboto min-w-full text-center mb-14 md:text-4xl">
          New Password
        </h1>
        <div className="flex flex-col gap-6 ">
          <InputField
            label="Password"
            type="text"
            id="user_password"
            name="user_password"
            placeholder="password"
            className="py-2 text-lg"
            value={values.user_password}
            onBlur={handleBlur}
            onChange={handleChange}
            error={
              errors.user_password && touched.user_password
                ? errors.user_password
                : ""
            }
          />
          <InputField
            label="confirm"
            type="text"
            id="user_confirm"
            name="user_confirm"
            placeholder="confirm"
            className="py-2 text-lg"
            value={values.user_confirm}
            onBlur={handleBlur}
            onChange={handleChange}
            error={
              errors.user_confirm && touched.user_confirm
                ? errors.user_confirm
                : ""
            }
          />
        </div>
        {mutation.isLoading ? (
          <Button
            className=" py-2 w-full px-16 mt-7 rounded-lg bg-blue hover:bg-blue_hover transition-all ease-in-out duration-300 "
            text="Changing Password"
            disabled={true}
            iconSize={18}
            icon={FaSpinner}
            animation="animate-spin"
          />
        ) : (
          <Button
            type="submit"
            className=" py-2 w-full px-16 mt-7 rounded-lg bg-blue hover:bg-blue_hover transition-all ease-in-out duration-300 "
            text="Change Password"
          />
        )}

        <div className="flex justify-center mb-8">
          <Link to="/Login" className="mt-2">
            <h1 className="text-gray-700 font-roboto  hover:text-red">Login</h1>
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default NewPassword;
