
import React, { useState } from 'react';

function Filters() {
  const [filter, setFilter] = useState({ price: '', color: '', mileage: '' });

  return (
    <div>
      <label>Price:</label>
      <input type="number" value={filter.price} onChange={(e) => setFilter({ ...filter, price: e.target.value })} />
      <label>Color:</label>
      <input type="text" value={filter.color} onChange={(e) => setFilter({ ...filter, color: e.target.value })} />
      <label>Mileage:</label>
      <input type="number" value={filter.mileage} onChange={(e) => setFilter({ ...filter, mileage: e.target.value })} />
    </div>
  );
}

export default Filters;
