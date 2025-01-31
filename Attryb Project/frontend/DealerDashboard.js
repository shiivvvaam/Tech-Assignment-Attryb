
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function DealerDashboard() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Fetch dealer's car inventory
  }, []);

  return (
    <div>
      <h2>Dealer Dashboard</h2>
      <Link to="/add-car">Add New Car</Link>
      <div>
        <h3>My Cars</h3>
        <ul>
          {cars.map(car => (
            <li key={car.id}>
              {car.title} <button>Edit</button> <button>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DealerDashboard;
