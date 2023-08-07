import React from "react";

const InputField = ({
  label,
  placeholder,
  type,
  className,
  value,
  onChange,
}) => {
  return (
    <div className={`flex flex-col`}>
      <label
        htmlFor=""
        className="font-normal mb-1 text-blue font-roboto text-lg "
      >
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className={`font-roboto max-h-16 outline-none px-4  rounded border-2 border-blue ${className}`}
      />
    </div>
  );
};

export default InputField;
