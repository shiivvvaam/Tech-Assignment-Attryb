
CREATE TABLE OEMSpecs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  model VARCHAR(255),
  year INT,
  price DECIMAL(10, 2),
  color VARCHAR(50),
  mileage INT,
  power INT,
  max_speed INT
);

CREATE TABLE MarketplaceInventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  price DECIMAL(10, 2),
  color VARCHAR(50),
  mileage INT,
  description TEXT
);

-- Insert some dummy data
INSERT INTO OEMSpecs (model, year, price, color, mileage, power, max_speed) VALUES
('Honda City 2015', 2015, 700000, 'Red', 45000, 120, 180),
('Toyota Corolla 2017', 2017, 800000, 'Blue', 30000, 130, 200);

INSERT INTO MarketplaceInventory (title, price, color, mileage, description) VALUES
('Honda City 2015', 650000, 'Red', 45000, 'Well maintained, no accidents.'),
('Toyota Corolla 2017', 750000, 'Blue', 30000, 'Great condition, one previous owner.');
