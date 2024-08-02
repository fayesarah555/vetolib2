const express = require('express');
const medicalRecordController = require('../controllers/medicalRecordController');
const router = express.Router();

router.get('/', medicalRecordController.getAllMedicalRecords);
router.post('/', medicalRecordController.createMedicalRecord);

module.exports = router;
