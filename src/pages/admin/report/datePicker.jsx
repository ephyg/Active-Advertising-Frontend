import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function MyDatePickerComponent() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div class="border-2 border-solid border-blue p-2 rounded-md">
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      dateFormat="MM/dd/yyyy"
      placeholderText="search by date"
      className="border-none"
      
    />
    <button className="bg-blue-500 hover:bg-blue-700 text-blue font-bold  rounded">
    Search
  </button>
  </div>
  );
}

export default MyDatePickerComponent;
