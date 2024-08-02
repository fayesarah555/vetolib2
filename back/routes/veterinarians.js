const express = require('express');
const veterinarianController = require('../controllers/veterinarianController');
const router = express.Router();

router.get('/', veterinarianController.getAllVeterinarians);
router.post('/', veterinarianController.createVeterinarian);

module.exports = router;
