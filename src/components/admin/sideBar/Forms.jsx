import React, { useState } from "react";
import Layout from "../../Layout/Layout";
import AgreementForm from "../../../pages/common/agreementForm/AgreementForm";
import PaymentRequest from "../../../pages/common/PaymentRequestForm/PaymentRequestForm";
import DeliveryForm from "../../../pages/common/deliveryForm/DeliveryForm";
import PaymentRequestForm from "../../../pages/common/PaymentRequestForm/PaymentRequestForm";
function Forms() {
  const [toggle, setToggle] = useState("agreement");
  const handleAgreement = () => {
    setToggle("agreement");
  };
  const handlePaymentRequest = () => {
    setToggle("paymentRequest");
  };

  return (
    <Layout>
      <div className="">
        <div className="w-full md:flex justify-center items-center">
          <div className=" relative w-fit mb-6 text-red font-roboto font-bold text-xl ">
            <span className="mb-2px">Forms</span>
            <div className="absolute h-2px -bottom-1 left-0 w-1/2 bg-blue"></div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleAgreement}
            className={`px-4 py-1  rounded text-white font-roboto ${
              toggle == "agreement" ? "bg-red" : "bg-blue "
            }`}
          >
            Agreement
          </button>
          <button
            onClick={handlePaymentRequest}
            className={`px-4 py-1  rounded text-white font-roboto ${
              toggle == "paymentRequest" ? "bg-red" : "bg-blue"
            }`}
          >
            Payment Request
          </button>
         
        </div>
        {toggle == "agreement" && <AgreementForm />}
        {toggle == "paymentRequest" && <PaymentRequestForm />}
      </div>
    </Layout>
  );
}

export default Forms;
