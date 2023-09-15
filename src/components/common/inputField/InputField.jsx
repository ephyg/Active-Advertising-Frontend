import React from "react";
import "../../../../custom.scss";
const InputField = ({
  label,
  placeholder,
  type,
  className,
  value,
  onChange,
  error,
  handleBlur,
  id,
  name,
  disabled,
}) => {
  return (
    <div className={`flex flex-col`}>
      <label
        htmlFor=""
        className="font-normal mb-1 text-blue font-roboto text-lg md:text-sm"
      >
        {label}
      </label>

      <input
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        onBlur={handleBlur}
        name={name}
        id={id}
        disabled={disabled}
        className={`font-roboto max-h-16 outline-none px-4  rounded border-2 border-blue ${className}`}
      />
      <label htmlFor="" className="text-sm text-red">
        {error}
      </label>
    </div>
  );
};

export default InputField;
