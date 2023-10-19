import React from "react";
import Layout from "../../../components/Layout/Layout";
import * as api from "../../../api/staffApi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useUserStore from "../../../store/userStore";
import InputField from "../../../components/common/inputField/InputField";
import Button from "../../../components/common/button/Button";
import { useFormik } from "formik";
import validateRole from "./validateRole";
import Loading from "../../../assets/image/Loading.gif";
import { ToastContainer,toast } from "react-toastify";
function AddRole() {
  const user = useUserStore();
  const queryClient = useQueryClient();

  const {
    data: roles,
    isLoading: roleLoading,
    isError,
  } = useQuery("userRole-store", () => api.GetRole(user.token));

  const addRole = (userdata) => {
    const response = api.AddRole(user.token, userdata);
    return response;
  };
  const onSubmit = () => {
    const single_role = {
      role: values.new_role,
    };
    roleMutation.mutate(single_role);
  };
  const roleMutation = useMutation(addRole, {
    onSuccess: async (response) => {
      await queryClient.invalidateQueries(["userRole-store"]);
      await queryClient.refetchQueries({
        include: "active",
      });
    },
    onError: (response) => {
      toast.error(response.response.data.message, {
        position: "top-center",
        toastId: "successUser",
      });
    },
  });
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        new_role: "",
      },
      validationSchema: validateRole,
      onSubmit,
    });
  if (roleLoading) {
    return (
      <div className="flex bg-transparent h-screen w-full justify-center items-center">
        <img src={Loading} className="w-24 " alt="Loading..." />
      </div>
    );
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="">
        <h1 className="  w-fit mb-6 text-red font-roboto  text-2xl font-normal ">
          Role Registration
        </h1>
        <div className="flex flex-col w-72 gap-4">
          <InputField
            label="Role Type"
            id="role"
            name="new_role"
            placeholder="New Role"
            className="py-2 text-lg"
            value={values.new_role}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.new_role && touched.new_role ? errors.new_role : ""}
          ></InputField>
          <button
            onClick={onclick}
            className="rounded-sm bg-blue py-1 px-10 text-white font-roboto font-light shadow-md shadow-stone-500 hover:bg-blue_hover"
          >
            Add Role
          </button>
        </div>
      </form>
      <div className="">
        <div className="relative top-12 ">
          <h1 className="relative w-fit mb-3 text-red font-roboto text-2xl font-normal ">
            Roles
          </h1>
          {roles.length === 0 && <p>No roles found</p>}
          <ul className="relative w-52 h-fit text-blue font-roboto divide-y-2 divide-blue border-2 border-blue  rounded-sm">
            {roles.map((role) => (
              <li className="p-2 ">{role.role}</li>
            ))}
          </ul>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
}

export default AddRole;
