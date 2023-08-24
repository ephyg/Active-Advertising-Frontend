import React, { useState } from "react";
import Layout from "../../../components/Layout/Layout";
import defaultProfileImage from "../../../assets/image/users.png";
import Button from "../../../components/common/button/Button";
import InputField from "../../../components/common/inputField/InputField";
import { useFormik } from "formik";
import * as api from "../../../api/freelancerApi";
import AddStaffValidation from "./AddStaffValidation";
import { useMutation, useQuery } from "react-query";
import { AddProforma } from "../../../api/proformaApi";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import useUserStore from "../../../store/userStore";
function AddFreelancer() {
  const user = useUserStore();
  const [profile_picture_url, setProfile_picture_url] = useState("");
  const [img, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(defaultProfileImage);

  const imageHandler = (event) => {
    const selectedImage = event.target.files ? event.target.files[0] : null;
    setImage(selectedImage);
    console.log(selectedImage);
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const addFreelancer = (userdata) => {
    const response = () => api.AddFreelancer(user.token, userdata);
    return response;
  };
  const FreelancerMutation = useMutation(addFreelancer, {
    onSuccess: (response) => {
      toast.success("Freelancer Registered Successfully ", {
        position: "top-center",
        toastId: "successUser",
      });
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
        freelancer_first_name: values.first_name,
        freelancer_last_name: values.last_name,
        freelancer_email: values.email,
        freelancer_address: values.address,
        freelancer_phone_number: values.phone_number,
        freelancer_portfolio_link: values.portfolio_link,
        freelancer_image_url: uploadedFileUrl,
      };
      FreelancerMutation.mutate(UserData);
      console.log("Done successfully", UserData);
    });
  };
  const upload = (callback) => {
    const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
    const CLOUDINARY_UPLOAD_PRESET = import.meta.env
      .VITE_CLOUDINARY_UPLOAD_PRESET;
    var bodyFormData = new FormData();
    console.log(defaultProfileImage);
    if (img === null) {
      return callback(
        "https://res.cloudinary.com/drbvkt6rd/image/upload/v1692794747/gasweutssmb0ghn8sqrf.png"
      );
    }
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

        console.log(error);
      });
  };
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        first_name: "",
        last_name: "",
        email: "",
        address: "",
        phone_number: "",
        role: "",
        portfolio_link: "",
      },
      validationSchema: AddStaffValidation,
      onSubmit,
    });
  if (FreelancerMutation.isLoading) {
    return <h1>Loading..</h1>;
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
              placeholder="John"
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
              placeholder="Doe"
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
              placeholder="johndoe@gmail.com"
              className="py-2 text-lg"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email && touched.email ? errors.email : ""}
            />
            <InputField
              label="Address"
              id="address"
              name="address"
              placeholder="Addis Ababa, Bole"
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
              placeholder="0908985812"
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
            <InputField
              label="Portfolio Link"
              id="portfolio_link"
              name="portfolio_link"
              placeholder="http://"
              className="py-2 text-lg"
              value={values.portfolio_link}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.portfolio_link && touched.portfolio_link
                  ? errors.portfolio_link
                  : ""
              }
            />
          </div>
        </div>
        <div className="flex mb-6 w-full justify-center">
          <Button
            type="submit"
            // onClick={handleSubmit}
            text="Register"
            className=" bg-blue px-14 hover:bg-blue_hover py-2 rounded-md"
          />
        </div>
      </form>
      <ToastContainer />
    </Layout>
  );
}

export default AddFreelancer;
