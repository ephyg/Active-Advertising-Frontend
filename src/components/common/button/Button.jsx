import React from "react";

const Button = ({ className, text }) => {
  return (
    <div className="flex items-stretch justify-center">
      <button
        className={`py-2  font-roboto text-lg text-white  items-stretch ${className}`}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
