const express = require('express');
const veterinarianController = require('../controllers/veterinarianController');
const router = express.Router();

router.get('/', veterinarianController.getAllVeterinarians);
router.post('/', veterinarianController.createVeterinarian);
router.get('/:id', veterinarianController.getVeterinarianById);
module.exports = router;
