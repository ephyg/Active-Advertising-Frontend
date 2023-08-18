import React from 'react';
import './report.css';

function ProgressBar({ taskName, percentage }) {
  const progressStyles = {
    width: `${percentage}%`,
    backgroundColor: percentage < 30
    ? '#E92035' // Red color for < 30%
    : percentage >= 30 && percentage <= 55
    ? '#F8DE22' // Orange color for 30% to 55%
    : '#38E54D', // Blue color for > 55%
  };

  const percentageStyles = {
    color: percentage < 30
        ? '#E92035' // Red color for < 30%
        : percentage >= 30 && percentage <= 55
        ? '#F8DE22' // Orange color for 30% to 55%
        : '#38E54D', // Blue color for > 55%
  };
  
  

  return (
    <div className="progress-container">
      <div className="progress-label">
        
        <span className="pl-48 -mt-6 percentage" style={percentageStyles}>
          {percentage}%
        </span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={progressStyles}></div>
      </div>
    </div>
  );
}

export default ProgressBar;

