import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import defaultProfileImage from "../../../assets/image/users.png";
import Button from "../../../components/common/button/Button";
import InputField from "../../../components/common/inputField/InputField";
import { useFormik } from "formik";
import * as api from "../../../api/staffApi";
import AddStaffValidation from "./AddStaffValidation";
import { useMutation, useQuery } from "react-query";
import { AddProforma } from "../../../api/proformaApi";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../../assets/image/Loading.gif";
import axios from "axios";
import useUserStore, { useUserData } from "../../../store/userStore";
import { useNavigate } from "react-router-dom";
function DesignerProfileComponent({ CurrentUserData }) {
  const navigate = useNavigate();

  const [profile_picture_url, setProfile_picture_url] = useState("");
  const [img, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    CurrentUserData.user_image_url
  );
  const user = useUserStore();

  const imageHandler = (event) => {
    const selectedImage = event.target.files ? event.target.files[0] : null;
    setImage(selectedImage);
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };
  const UpdateUser = (userdata) => {
    const response = api.UpdateUser(user.token, CurrentUserData.id, userdata);
    return response;
  };
  const staffMutation = useMutation(UpdateUser, {
    onSuccess: (response) => {
      // navigate("/staffs");
    },
    onError: (response) => {
      toast.error(response.response.data.message, {
        position: "top-center",
        toastId: "successUser",
      });
    },
  });
  const onSubmit = () => {
    upload((uploadedFileUrl) => {
      const UserData = {
        user_first_name: values.first_name,
        user_last_name: values.last_name,
        user_email: values.email,
        user_address: values.address,
        user_phone_number: values.phone_number,
        user_image_url: uploadedFileUrl,
        // user_password: `${values.first_name + "." + values.last_name}`,
        user_password: values.user_password,
      };
      staffMutation.mutate(UserData);
    });
  };
  const upload = (callback) => {
    const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
    const CLOUDINARY_UPLOAD_PRESET = import.meta.env
      .VITE_CLOUDINARY_UPLOAD_PRESET;
    if (img === null) {
      return callback(CurrentUserData.user_image_url);
    }
    var bodyFormData = new FormData();
    bodyFormData.append("file", img);
    bodyFormData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    axios
      .post(
        `http://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        bodyFormData
      )
      .then((res) => {
        if (res.data.secure_url !== undefined) {
          const uploadedFileUrl = res.data.secure_url;
          setProfile_picture_url(uploadedFileUrl);
          callback(uploadedFileUrl);
        }
      })
      .catch((error) => {
        // setError(error.message);
      });
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        first_name: CurrentUserData.user_first_name,
        last_name: CurrentUserData.user_last_name,
        email: CurrentUserData.user_email,
        address: CurrentUserData.user_address,
        phone_number: CurrentUserData.user_phone_number,
        user_image_url: CurrentUserData.user_image_url,
        user_password: "",
        user_confirm: "",
      },
      validationSchema: AddStaffValidation,
      onSubmit,
    });

  if (staffMutation.isLoading) {
    return (
      <div className="flex bg-transparent h-screen w-full justify-center items-center">
        <img src={Loading} className="w-24 " alt="Loading..." />
      </div>
    );
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div>
          <label htmlFor="profileImg" className="cursor-pointer">
            <img
              src={imagePreview}
              alt=""
              className="w-32 h-32 object-fill rounded-full border-2 border-x-blue border-y-red mb-3"
            />
          </label>
          <h2 className="text-lg font-roboto text-red font-bold cursor-pointer">
            Upload Profile
          </h2>
          <input
            id="profileImg"
            type="file"
            onChange={imageHandler}
            className="hidden"
          />
        </div>
        <div className="flex flex-col w-full px-20 mb-10">
          <h2 className="text-lg font-roboto text-red w-full text-start font-bold mb-3">
            Basic Informations
          </h2>
          <div className="grid grid-cols-2 gap-x-16 gap-y-4">
            <InputField
              label="First Name"
              className="py-2 text-lg"
              type="text"
              id="first_name"
              name="first_name"
              value={values.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.first_name && touched.first_name ? errors.first_name : ""
              }
            />
            <InputField
              label="Last Name"
              id="last_name"
              name="last_name"
              className="py-2 text-lg"
              value={values.last_name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.last_name && touched.last_name ? errors.last_name : ""
              }
            />
            <InputField
              label="Email"
              type="email"
              id="email"
              name="email"
              className="py-2 text-lg"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email && touched.email ? errors.email : ""}
              disabled={true}
            />
            <InputField
              label="Address"
              id="address"
              name="address"
              className="py-2 text-lg"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.address && touched.address ? errors.address : ""}
            />
            <InputField
              label="Phone Number"
              id="phone_number"
              name="phone_number"
              className="py-2 text-lg"
              value={values.phone_number}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.phone_number && touched.phone_number
                  ? errors.phone_number
                  : ""
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <h2 className="text-lg font-roboto text-red w-full text-start font-bold mb-3">
              Security Question
            </h2>
            <div className="grid grid-cols-2 gap-x-16 gap-y-4 w-full">
              <InputField
                className="py-2"
                label="Password"
                type="password"
                id="user_password"
                name="user_password"
                value={values.user_password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  errors.user_password && touched.user_password
                    ? errors.user_password
                    : ""
                }
              />
              <InputField
                className="py-2"
                label="Confirm"
                type="password"
                id="user_confirm"
                name="user_confirm"
                value={values.user_confirm}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  errors.user_confirm && touched.user_confirm
                    ? errors.user_confirm
                    : ""
                }
              />
            </div>
          </div>
        </div>
        <div className="flex mb-6 w-full justify-center">
          <Button
            type="submit"
            onClick={handleSubmit}
            text="Update Profile"
            className=" bg-blue px-14 hover:bg-blue_hover py-2 rounded-md"
          />
        </div>
      </form>
      <ToastContainer />
    </Layout>
  );
}

export default DesignerProfileComponent;
