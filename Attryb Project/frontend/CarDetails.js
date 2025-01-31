
import React, { useState } from 'react';

function CarDetails() {
  const [carDetails, setCarDetails] = useState({
    title: '',
    price: '',
    color: '',
    mileage: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle car details submission here
  };

  return (
    <div>
      <h2>Add Car Details</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={carDetails.title} onChange={(e) => setCarDetails({ ...carDetails, title: e.target.value })} />
        <label>Price:</label>
        <input type="number" value={carDetails.price} onChange={(e) => setCarDetails({ ...carDetails, price: e.target.value })} />
        <label>Color:</label>
        <input type="text" value={carDetails.color} onChange={(e) => setCarDetails({ ...carDetails, color: e.target.value })} />
        <label>Mileage:</label>
        <input type="number" value={carDetails.mileage} onChange={(e) => setCarDetails({ ...carDetails, mileage: e.target.value })} />
        <label>Description:</label>
        <textarea value={carDetails.description} onChange={(e) => setCarDetails({ ...carDetails, description: e.target.value })}></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CarDetails;
