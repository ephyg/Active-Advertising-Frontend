import React from "react";

const InputField = ({ label, placeholder, type, className }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label
        htmlFor=""
        className="font-normal mb-1 text-blue font-roboto text-lg "
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="font-roboto text-lg max-h-16 outline-none px-4 py-2 rounded border-2 border-blue"
      />
    </div>
  );
};

export default InputField;
