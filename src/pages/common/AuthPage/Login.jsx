import React, { useEffect, useState } from "react";
import Logo from "../../../assets/image/logocopy.png";
import InputField from "../../../components/common/inputField/InputField";
import Button from "../../../components/common/button/Button";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../../../store/userStore";
import * as api from "../../../api/userApi";
import { useMutation, useQuery } from "react-query";
import { Formik, useFormik } from "formik";
import LoginValidation from "./LoginValidation";
import { ToastContainer, toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import useForgotStore from "../../../store/forgotStore";
const Login = () => {
  const navigate = useNavigate();
  const [credentialError, setCredentialError] = useState("");
  const { login, token } = useUserStore();
  const { notification, setSentMessage, sentMessage, setNotification } =
    useForgotStore();

  useEffect(() => {
    if (notification == 3) {
      toast.success(sentMessage, {
        position: "top-left",
        toastId: "success3",
      });
    }
    setNotification({
      notification: null,
    });
  }, []);
  const loginUser = async (data) => {
    const response = await api.LoginUser(data);
    return response;
  };
  const mutation = useMutation(loginUser, {
    onSuccess: (userData) => {
      login(userData);
      console.log(userData);
      userData.user.user_role === "admin" ? navigate("/report") : navigate("/order");
    },
  });
  const onSubmit = async (values) => {
    const data = {
      user_email: values.email,
      user_password: values.password,
    };
    try {
      await mutation.mutateAsync(data);
    } catch (error) {
      setCredentialError(error.response.data.message);
    }
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
  // const { data: authUserData, isLoading } = useQuery("authUser", () =>
  //   api.AuthenticatedUser(token)
  // );

  // const user_role = authUserData.user_role;
  // if (isLoading) {
  //   return <h1>Loading sidebar....</h1>;
  // }
  return (
    <div className="grid grid-cols-2 min-h-screen bg-white_blue md:grid-cols-1">
      <div className="flex justify-end items-center max-h-screen bg-login bg-cover bg-no-repeat md:hidden">
        <img src={Logo} alt="" className="w-562 mb-32 md:w-400" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-stretch 2xl:px-36 xl:px-32 lg:px-5 sm:px-5 md:px-5 md:min-h-screen"
      >
        <h1 className="text-6xl font-bold text-red font-roboto min-w-full text-center md:text-4xl ">
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
        {mutation.isLoading ? (
          <Button
            className="mt-9 py-2 px-14 w-full rounded-lg bg-blue hover:bg-blue_hover transition-all ease-in-out duration-300 "
            text="Loading"
            disabled={true}
            iconSize={18}
            icon={FaSpinner}
            animation="animate-spin"
          />
        ) : (
          <Button
            className="mt-9 py-2 px-16 w-full rounded-lg bg-blue hover:bg-blue_hover transition-all ease-in-out duration-300 "
            text="Login"
          />
        )}
        <Link to="/forgot" className=" mb-8 flex justify-center mt-2">
          <h1 className="text-sm text-gray-700 font-roboto  hover:text-red ">
            Forgot Password
          </h1>
        </Link>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
