import React, { Fragment, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import Button from "../../../components/common/button/Button";
import InputField from "../../../components/common/inputField/InputField";



function BasicInfo() {
 const roles = ['Account Manager','Accountant','Freelancer','Graphic Designer','Transporter','Vendor','Dealer','miles','morales'];
  
  
  
  return (
    <Layout>
      <div className=" relative top-6 ">
        
        <h1 className="relative  w-fit mb-6 text-red font-roboto  text-2xl font-normal ">
        Role Registration
        </h1>
        <h4 className="text-blue font-roboto ">Role Type</h4> 
        <InputField className={"w-72 h-10 shadow-lg   rounded-sm placeholder-blue placeholder-opacity-50"} placeholder={"New role"}></InputField>
        <Button text="Add" className=" relative top-3 right-96 translate-x-10 bg-blue w-17 h-8 p-4 rounded-lg font-light shadow-md shadow-stone-500 hover:bg-white hover:text-blue"></Button>
        
        
      </div>

      
        <div className="relative top-12 ">
          <h1 className="relative w-fit mb-3 text-red font-roboto text-2xl font-normal ">
            Roles
          </h1>
          {roles.length===0 && <p>No roles found</p>}
          <ul className="relative w-52 h-fit text-blue font-roboto divide-y-2 divide-blue border-2 border-blue  rounded-sm">
            {roles.map((role) => (<li className="p-2 " >{role}</li>)
              
            )}
          </ul>
      
        </div>
     
      
      <div class=" mr-36 layout flex items-center h-3/4">
        <div class=" h-3/4 border-dotted border-r-2 border-red "></div>
      </div>

     
     
      <div class="layout">
        <div className=" relative -top-24 translate-y-3">
        
          <div className=" relative ">
            <h1 className="relative  w-fit mb-6 text-red font-roboto  text-2xl font-normal ">
            Basic Informations
            </h1>
            <h4 className="relative   text-blue font-roboto ">Account No</h4>
            <InputField  className=" w-72 h-10 shadow-lg   rounded-sm placeholder-blue placeholder-opacity-50" placeholder="name"></InputField>
            <Button text="Add" className=" relative top-2 left-28 bg-blue w-17 h-8 p-4 rounded-lg font-light shadow-md shadow-stone-500  hover:bg-white hover:text-blue "></Button>
          </div>
          <div className="relative top-4">
            <h4 className="relative   text-blue font-roboto ">Contact</h4>
            <InputField className={"  w-72 h-10 shadow-lg   rounded-sm placeholder-blue placeholder-opacity-50"} placeholder={"name"}></InputField>
            <Button text="Add" className=" relative top-2 left-28 bg-blue w-17 h-8 p-4 rounded-lg font-light shadow-md shadow-stone-500 transition delay-100 duration-300 hover:bg-white hover:text-blue "></Button>
          </div>
          
        </div>
      </div>

    {/* <form>
      <label class="block">
        <span class="block text-sm font-medium text-slate-700">Email</span>
        <input type="email" class="peer ..."/>
        <p class="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
          Please provide a valid email address.
        </p>
      </label>
  </form> */}
      
        
  </Layout>
   
  );
}

export default BasicInfo;
