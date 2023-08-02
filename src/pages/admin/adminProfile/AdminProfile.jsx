import React, { useState } from "react";
import Layout from "../../../components/Layout/Layout";
import Profile from "../../../assets/image/profile.jpeg";
import Button from "../../../components/common/button/Button";
import InputField from "../../../components/common/inputField/InputField";
function AdminProfile() {
  const [img, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(Profile);
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

  return (
    <Layout>
        <div className="flex flex-col">
          <div className="flex flex-col justify-center items-center gap-10 mb-4">
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
            <div className="flex flex-col w-full px-20">
              <h2 className="text-lg font-roboto text-red w-full text-start font-bold mb-3">
                Basic Informations
              </h2>
              <div className="grid grid-cols-2 gap-x-16 gap-y-4">
                <InputField className="py-2" label="First Name" />
                <InputField className="py-2" label="Last Name" />
                <InputField className="py-2" label="Email" type="email" />{" "}
                <InputField className="py-2" label="Address" />
                <InputField className="py-2" label="Phone Number" />
              </div>
            </div>
            <div className="flex flex-col w-full px-20">
              <h2 className="text-lg font-roboto text-red w-full text-start font-bold mb-3">
                Security Question
              </h2>
              <div className="grid grid-cols-2 gap-x-16 gap-y-4">
                <InputField className="py-2" label="Password" type="password" />
                <InputField className="py-2" label="Confirm" type="password" />
              </div>
            </div>
            <div className="flex mb-6">
              <Button text="Update Profile" className=" bg-blue px-4 py-1 rounded-md" />
            </div>
          </div>
        </div>
    </Layout>
  );
}

export default AdminProfile;
