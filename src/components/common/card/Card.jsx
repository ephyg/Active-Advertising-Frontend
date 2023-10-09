import React from "react";

function Card({ text, information }) {
  return (
    <div className=" border shadow-sm py-4 pl-3 rounded-lg flex flex-col gap-1 h-24">
      <h1 className="text-blue text-base font-roboto font-bold">{text}</h1>
      <h1
        className="text-sm font-roboto"
        dangerouslySetInnerHTML={{ __html: information }}
      ></h1>
    </div>
  );
}

export default Card;
