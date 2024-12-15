import React, { useState } from 'react';
import axios from 'axios';

const BookVehicle = ({ vehicleId }) => {
  const [dates, setDates] = useState({ start: '', end: '' });
  const [totalAmount, setTotalAmount] = useState(0);

  const handleBooking = () => {
    axios.post('http://localhost:5000/api/book', { 
      vehicleId, 
      startDate: dates.start, 
      endDate: dates.end, 
      totalAmount 
    })
    .then(res => alert('Booking Successful'))
    .catch(err => alert('Booking Failed'));
  };

  return (
    <div>
      <input 
        type="date" 
        value={dates.start} 
        onChange={(e) => setDates({ ...dates, start: e.target.value })} 
      />
      <input 
        type="date" 
        value={dates.end} 
        onChange={(e) => setDates({ ...dates, end: e.target.value })} 
      />
      <p>Total: ${totalAmount}</p>
      <button onClick={handleBooking}>Confirm Booking</button>
    </div>
  );
};

export default BookVehicle;
