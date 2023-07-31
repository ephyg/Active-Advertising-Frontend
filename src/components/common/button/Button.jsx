import React from "react";

const Button = ({ className, text, icon, onClick,clr }) => {
  return (
    <div className="flex items-stretch justify-center">
      <button
        className={`font-roboto font-bold text-lg text-white items-stretch flex ${className}`}
        onClick={onClick}
      >
        <div className="flex justify-center items-center gap-2">
          {icon != null &&
            React.createElement(icon, {
              size: 13,
              color: `${clr}`
            })}
          {text}
        </div>
      </button>
    </div>
  );
};

export default Button;
