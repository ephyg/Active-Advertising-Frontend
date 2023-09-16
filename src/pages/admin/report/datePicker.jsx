import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function MyDatePickerComponent({ selectedDate, setSelectedDate }) {
  // const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSearch = () => {
    if (selectedDate) {
      console.log("Selected date:", selectedDate);
      const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-indexed
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
      };

      const formattedDate = selectedDate ? formatDate(selectedDate) : "";
      // setSelectedDate(formattedDate);

      console.log(selectedDate);
    } else {
      console.log("No date selected.");
    }
  };

  return (
    <div className="flex gap-3 border border-solid border-blue p-2 rounded-md">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        showTimeInput={false}
        placeholderText="search by date"
        className="border-none bg-transparent outline-none"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 hover:text-red text-blue font-bold rounded"
      >
        Search
      </button>
    </div>
  );
}

export default MyDatePickerComponent;
