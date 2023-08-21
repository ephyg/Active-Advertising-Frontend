import React from "react";
import Logo from "../../../assets/image/logocopy.png";
import InputField from "../../../components/common/inputField/InputField";
import Button from "../../../components/common/button/Button";
import { Link } from "react-router-dom";
import useUserStore from "../../../store/userStore";
import Validation from "./LoginValidation";
import { useFormik } from "formik";
import NewPasswordValidation from "./NewPasswordConfirmation";
const NewPassword = () => {
  const user = useUserStore((state) => state.user);
  const onSubmit = () => {
    // useUserStore.getState().login(token);
    // user === "admin" ? navigate("/report") : navigate("/order");
  };
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        password: "",
        confirm: "",
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
        className="flex flex-col justify-center items-stretch px-32 md:px-5 md:min-h-screen"
      >
        <h1 className="text-5xl font-bold text-red font-roboto min-w-full text-center mb-14">
          New Password
        </h1>
        <div className="flex flex-col gap-6 ">
          <InputField
            label="Password"
            type="text"
            id="password"
            name="password"
            placeholder="password"
            className="py-2 text-lg"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.password && touched.password ? errors.password : ""}
          />
          <InputField
            label="confirm"
            type="text"
            id="confirm"
            name="confirm"
            placeholder="confirm"
            className="py-2 text-lg"
            value={values.confirm}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.confirm && touched.confirm ? errors.confirm : ""}
          />
        </div>

        <Button
          className=" py-2 px-16 mt-7 rounded-lg bg-blue hover:bg-blue_hover transition-all ease-in-out duration-300 "
          text="Change Password"
        />
        <div className="flex justify-center mb-8">
          <Link to="/Login" className="mt-2">
            <h1 className="text-gray-700 font-roboto  hover:text-red">Login</h1>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default NewPassword;
