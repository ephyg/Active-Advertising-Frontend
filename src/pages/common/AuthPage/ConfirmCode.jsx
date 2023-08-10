import React, { useEffect, useState } from "react";
import Logo from "../../../assets/image/logocopy.png";
import InputField from "../../../components/common/inputField/InputField";
import Button from "../../../components/common/button/Button";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../../../store/userStore";
import useForgotStore from "../../../store/forgotStore";
import { FaSpinner } from "react-icons/fa";
import { useFormik } from "formik";
import ConfirmCodeValidation from "./ConfirmCodeValidation";
import * as api from "../../../api/forgotApi";
import { useMutation } from "react-query";
import { ToastContainer, toast } from "react-toastify";

const ConfirmCode = () => {
  const navigate = useNavigate();
  const [credentialError, setCredentialError] = useState("");
  const [resend, setResend] = useState(0);
  const {
    setUser_email,
    setVerification,
    user_email,
    setSentMessage,
    sentMessage,
    notification,
    setNotification,
  } = useForgotStore();

  useEffect(() => {
    if (!user_email) {
      navigate("/forgot");
    }
  }, []);
  useEffect(() => {
    if (notification == 1) {
      toast.success(sentMessage, {
        position: "top-left",
        toastId: "success1",
      });
    }
    setNotification({
      notification: null,
    });
  }, [resend]);
  const verifyCode = async (data) => {
    const response = await api.VerifyCode(data);
    return response;
  };
  const mutateVerify = useMutation(verifyCode, {
    onSuccess: (response) => {
      setVerification({
        verification: true,
      });
      setSentMessage(response);

      navigate("/new-password");
      setNotification({
        notification: 2,
      });
    },
  });

  const onSubmit = async (values) => {
    const data = {
      user_email: user_email,
      reset_code: `${values.reset_code}`,
    };
    try {
      await mutateVerify.mutateAsync(data);
    } catch (error) {
      setCredentialError(error.response.data.message);
    }
  };
  const forgotPassword = async (data) => {
    const response = await api.ForgotPassword(data);
    return response;
  };
  const mutateForgot = useMutation(forgotPassword, {
    onSuccess: (response) => {
      setSentMessage(response);
      setNotification({
        notification: 1,
      });
      setResend(resend + 1);
    },
  });
  const handleResend = async () => {
    const data = {
      user_email: user_email,
    };
    try {
      await mutateForgot.mutateAsync(data);
    } catch (error) {}
  };
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        reset_code: "",
      },
      validationSchema: ConfirmCodeValidation,
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
        <h1 className="text-5xl font-bold text-red font-roboto min-w-full text-left mb-14 ">
          Verification
        </h1>
        {/* <h1 className="text-sm text-green font-roboto mb-14 text-left mt-3 ">
          {sentMessage}
        </h1> */}
        <div className="flex flex-col gap-6 ">
          <InputField
            label="Verification Code"
            type="number"
            id="reset_code"
            name="reset_code"
            placeholder="0000"
            className="py-2 text-lg"
            value={values.reset_code}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              errors.reset_code && touched.reset_code ? errors.reset_code : ""
            }
          />
        </div>
        {mutateForgot.isLoading ? (
          <div className="flex bg-slate-200 gap-2 w-24 mb-4 mt-1 items-center rounded-sm px-3">
            <FaSpinner size={13} color="red" className="animate-spin" />
            <h1 className="text-sm text-red  font-roboto py-1 ">Sending</h1>
          </div>
        ) : (
          <div className="">
            <button
              type="submit"
              className="text-sm text-center text-red mb-4 mt-1 bg-slate-200 font-roboto w-24 px-4 py-1 rounded-sm hover:bg-slate-300 cursor-pointer"
              onClick={handleResend}
            >
              Resend
            </button>
          </div>
        )}

        {mutateVerify.isLoading ? (
          <Button
            className="py-2 px-16 w-full rounded-lg bg-blue hover:bg-blue_hover transition-all ease-in-out duration-300 mb-8"
            text="Verifying"
            disabled={true}
            iconSize={18}
            icon={FaSpinner}
            animation="animate-spin"
          />
        ) : (
          <Button
            className="py-2 px-16 w-full rounded-lg bg-blue hover:bg-blue_hover transition-all ease-in-out duration-300 mb-8"
            text="Verify"
          />
        )}
      </form>
      <ToastContainer />
    </div>
  );
};

export default ConfirmCode;
