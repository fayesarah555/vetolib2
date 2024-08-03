const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);

// Register route
router.post('/register', userController.register);

// Login route
router.post('/login', userController.login);

module.exports = router;
