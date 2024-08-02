// routes/animals.js
const express = require('express');
const animalController = require('../controllers/animalController');
const router = express.Router();

router.get('/', animalController.getAllAnimals);
router.post('/', animalController.createAnimal);

module.exports = router;
