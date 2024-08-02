const express = require('express');
const medicationController = require('../controllers/medicationController');
const router = express.Router();

router.get('/', medicationController.getAllMedications);
router.post('/', medicationController.createMedication);

module.exports = router;
