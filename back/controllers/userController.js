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

// Register a new user
exports.register = async (req, res) => {
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

// Login user
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM Users WHERE username = ?', [username]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ user_id: user.user_id, username: user.username, role: user.role }, jwtSecret, {
      expiresIn: '1h',
    });

    res.json({ token, user_id: user.user_id, username: user.username, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
