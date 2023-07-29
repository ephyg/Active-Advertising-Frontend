import React from "react";

function Card({ text, information }) {
  return (
    <div className=" border shadow-sm py-4 pl-3 rounded-lg flex flex-col gap-1">
      <h1 className="text-blue text-lg font-roboto font-bold">{text}</h1>
      <h1 className="text-base font-roboto">{information}</h1>
    </div>
  );
}

export default Card;
