const express = require('express');
const Vehicle = require('../models/Vehicle');
const router = express.Router();

// Create a new vehicle listing
router.post('/', async (req, res) => {
  const { make, model, year, pricePerDay, imageUrl, location } = req.body;
  
  try {
    const newVehicle = new Vehicle({
      make,
      model,
      year,
      pricePerDay,
      imageUrl,
      location
    });

    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (err) {
    res.status(500).json({ message: 'Error creating vehicle listing', error: err });
  }
});

// Get all vehicles
router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching vehicles', error: err });
  }
});

module.exports = router;
