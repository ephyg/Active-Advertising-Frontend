import React from "react";

const Button = ({
  className,
  text,
  icon,
  onClick,
  clr,
  disabled,
  animation,
  type,
  iconSize,
}) => {
  return (
    <div className="flex items-stretch justify-center">
      <button
        type={type}
        className={`font-roboto font-bold text-lg text-white items-stretch flex justify-center ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        <div className="flex justify-center items-center gap-2">
          {icon != null &&
            React.createElement(icon, {
              size: iconSize,
              color: `${clr}`,
              className: `${animation}`,
            })}
          {text}
        </div>
      </button>
    </div>
  );
};

export default Button;
