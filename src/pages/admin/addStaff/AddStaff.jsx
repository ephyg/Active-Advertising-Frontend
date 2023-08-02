import React, { useState } from "react";
import Layout from "../../../components/Layout/Layout";
import Profile from "../../../assets/image/profile.jpeg";
import Button from "../../../components/common/button/Button";
import InputField from "../../../components/common/inputField/InputField";
function AddStaff() {
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
      <div className="flex flex-col items-center">
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
            <InputField className="py-2" label="First Name" />
            <InputField className="py-2" label="Last Name" />
            <InputField className="py-2" label="Email" type="email" />{" "}
            <InputField className="py-2" label="Address" />
            <InputField className="py-2" label="Phone Number" />
            <div className="flex flex-col">
              <label
                htmlFor=""
                className="font-normal mb-1 text-blue font-roboto text-lg "
              >
                Role
              </label>
              <select
                data-te-select-init
                className="h-12 border-2 border-blue bg-white outline-none text-blue py-1 rounded-md px-4 font-roboto flex-1"
              >
                <option value="1" className="">
                  Designer
                </option>
                <option value="2" className="">
                  Account Manager
                </option>
                <option value="3">Freelancer</option>
                <option value="4">Photographer</option>
                <option value="4">Dealer</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex mb-6">
          <Button text="Register" className=" bg-blue px-14W hover:bg-blue_hover py-2 rounded-md" />
        </div>
      </div>
    </Layout>
  );
}

export default AddStaff;
