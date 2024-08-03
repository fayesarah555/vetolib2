const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const saltRounds = 10; // Salt rounds for bcrypt
const jwtSecret = 'your_jwt_secret'; // Secret for JWT, should be stored securely

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new user (same as registration but may be used for admin purposes)
exports.createUser = async (req, res) => {
  const { username, password, email, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const [result] = await pool.query(
      'INSERT INTO Users (username, password, email, role) VALUES (?, ?, ?, ?)',
      [username, hashedPassword, email, role]
    );
    res.json({ user_id: result.insertId, username, email, role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.register = async (req, res) => {
  const { username, password, email, role } = req.body;
  
  try {
    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the new user into the database
    const [result] = await pool.query(
      'INSERT INTO Users (username, password, email, role) VALUES (?, ?, ?, ?)',
      [username, hashedPassword, email, role]
    );

    // Respond with the created user's details
    res.status(201).json({ user_id: result.insertId, username, email, role });
    
  } catch (err) {
    // Catch any errors and respond with a 500 status code
    res.status(500).json({ error: err.message });
  }
};


// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log('Received login request with data:', req.body);

    // Query the database for the user by email
    const [rows] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);

    if (rows.length === 0) {
      console.log('User not found');
      return res.status(401).json({ error: 'Invalid email' });
    }

    const user = rows[0];

    // Check if the password matches
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      console.log('Password mismatch');
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { user_id: user.user_id, username: user.username, role: user.role },
      jwtSecret,
      { expiresIn: '1h' }
    );

    res.json({ token, user_id: user.user_id, username: user.username, role: user.role });
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({ error: err.message });
  }
};
