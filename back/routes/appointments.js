const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const router = express.Router();

router.get('/', appointmentController.getAllAppointments);
router.post('/', appointmentController.createAppointment);

module.exports = router;
