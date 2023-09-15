import React from "react";
import "./report.css";

function ProgressBar({ taskName, percentage }) {
  const progressStyles = {
    width: `${percentage}%`,
    backgroundColor:
      percentage < 30
        ? "#E92035" // Red color for < 30%
        : percentage >= 30 && percentage <= 55
        ? "#F8DE22"
        : "#38E54D",
  };

  const percentageStyles = {
    color:
      percentage < 30
        ? "#E92035"
        : percentage >= 30 && percentage <= 55
        ? "#F8DE22"
        : "#38E54D",
  };

  return (
    <div className="h-2 bg-white w-full rounded-b-md rounded-t-md mb-3 mt-1">
      <div
        className="h-2 w-3/4 bg-red rounded-b-md rounded-t-md"
        style={progressStyles}
      ></div>
    </div>
  );
}

export default ProgressBar;
