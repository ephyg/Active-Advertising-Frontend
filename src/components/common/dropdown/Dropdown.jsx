import React from "react";

function Dropdown() {
  return (
    <div className="flex">
      <select
        data-te-select-init
        className="border-solid border-2 border-blue outline-none text-blue p-2 rounded-md px-4 font-roboto flex-1 items-stretch"
      >
        <option value="1" className="p-2" s>
          Unit of Measure
        </option>
        <option value="2">Account Manager</option>
        <option value="3">Designer</option>
        <option value="4">Photographer</option>
      </select>
    </div>
  );
}

export default Dropdown;
