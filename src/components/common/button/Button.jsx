import React from "react";

const Button = ({ className, text, icon }) => {
  return (
    <div className="flex items-stretch justify-center">
      <button
        className={`font-roboto font-bold text-lg text-white items-stretch flex ${className}`}
      >
        <div className="flex justify-center items-center gap-2">
          {icon != null &&
            React.createElement(icon, {
              size: 13,
            })}
          {text}
        </div>
      </button>
    </div>
  );
};

export default Button;
