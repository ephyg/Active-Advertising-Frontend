import React from "react";

function Dropdown() {
  return (
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
          Unit of Measure
        </option>
        <option value="2" className="">
          Account Manager
        </option>
        <option value="3">Designer</option>
        <option value="4">Photographer</option>
      </select>
    </div>
  );
}

export default Dropdown;
