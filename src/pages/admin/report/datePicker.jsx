import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function MyDatePickerComponent() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSearch = () => {
    if (selectedDate) {
      console.log("Selected date:", selectedDate);
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
