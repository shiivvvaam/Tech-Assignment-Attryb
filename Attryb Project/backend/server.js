
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Dummy data for OEM specs
const oemSpecs = [
  { model: 'Honda City 2015', year: 2015, price: 700000, color: 'Red', mileage: 45000, power: 120, max_speed: 180 },
  { model: 'Toyota Corolla 2017', year: 2017, price: 800000, color: 'Blue', mileage: 30000, power: 130, max_speed: 200 }
];

// API to query the number of OEM models available
app.get('/api/oem-models', (req, res) => {
  res.json({ models: oemSpecs.length });
});

// API to search for OEM specs for a specific model
app.get('/api/oem-specs/:model', (req, res) => {
  const model = req.params.model;
  const specs = oemSpecs.find(oem => oem.model.toLowerCase() === model.toLowerCase());
  if (specs) {
    res.json(specs);
  } else {
    res.status(404).send('Model not found');
  }
});

// Dummy database for marketplace inventory
let inventory = [
  { id: 1, title: 'Honda City 2015', price: 650000, color: 'Red', mileage: 45000, description: 'Well maintained, no accidents.' },
  { id: 2, title: 'Toyota Corolla 2017', price: 750000, color: 'Blue', mileage: 30000, description: 'Great condition, one previous owner.' }
];

// API to get all cars in the marketplace inventory
app.get('/api/inventory', (req, res) => {
  res.json(inventory);
});

// API to add a new car to the inventory
app.post('/api/inventory', (req, res) => {
  const { title, price, color, mileage, description } = req.body;
  const newCar = { id: inventory.length + 1, title, price, color, mileage, description };
  inventory.push(newCar);
  res.status(201).json(newCar);
});

// API to delete a car from the inventory
app.delete('/api/inventory/:id', (req, res) => {
  const { id } = req.params;
  inventory = inventory.filter(car => car.id !== parseInt(id));
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
