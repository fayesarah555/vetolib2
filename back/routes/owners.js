const express = require('express');
const ownerController = require('../controllers/ownerController');
const router = express.Router();

router.get('/', ownerController.getAllOwners);
router.post('/', ownerController.createOwner);

module.exports = router;
