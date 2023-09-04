import React from "react";
import Layout from "../../../components/Layout/Layout";
import Profile from "../../../assets/image/profile.jpeg";
import Button from "../../../components/common/button/Button";
import Card from "../../../components/common/card/Card";
import { useParams } from "react-router-dom";
import DATA from "../customerList/DATA.json";
function CustomerDetails() {
  const handleOnclick = () => {};
  const { id } = useParams();
  const filteredData = DATA.filter((item) => item.id == id);
  return (
    <Layout>
      <div className="flex flex-col">
        <div className="flex flex-col justify-center items-center gap-5 mb-4">
          <img
            src={Profile}
            alt=""
            className="w-32 rounded-full border-2 border-x-blue border-y-red"
          />
          <Button
            text="View Image"
            className="bg-blue text-white rounded-lg px-6 py-1"
            onClick={handleOnclick}
          />
        </div>
        <div className="flex flex-col px-28 mb-8">
          <h1 className="text-red font-roboto font-bold text-lg mb-3">
            Customer Details
          </h1>
          <div className="flex gap-6 w-full mb-5">
            <div className="flex flex-col w-full gap-4">
              <Card
                text="Company Name"
                information={filteredData[0]["Company-Name"]}
              />
              <Card
                text="Tin Number"
                information={filteredData[0]["Tin-Number"]}
              />
              <Card
                text="Contact Person"
                information={filteredData[0]["Payment-Request Number"]}
              />
            </div>
            <div className="flex flex-col w-full gap-4">
              <Card
                text="Phone Number"
                information={filteredData[0]["Phone Number"]}
              />
              <Card
                text="Payment Request Number"
                information={filteredData[0]["Address"]}
              />
              <Card
                text="Order Date"
                information={filteredData[0]["Order-Date"]}
              />
            </div>
          </div>
          <div className="flex gap-10 justify-center">
            <Button
              text="Orders"
              className="bg-blue text-white px-12 py-1 border rounded-lg"
            />
            <Button
              text="Delete"
              className="bg-red text-white px-12 py-1 border rounded-lg"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CustomerDetails;
