import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/vehicles')
      .then(res => setVehicles(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {vehicles.map(vehicle => (
        <div key={vehicle._id} className="border p-4">
          <img src={vehicle.imageUrl} alt={vehicle.model} />
          <h3>{vehicle.make} {vehicle.model}</h3>
          <p>{vehicle.description}</p>
          <p>${vehicle.pricePerDay} per day</p>
          <button className="bg-blue-500 text-white py-2 px-4">Book Now</button>
        </div>
      ))}
    </div>
  );
};

export default VehicleList;
