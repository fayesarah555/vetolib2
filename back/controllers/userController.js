const pool = require('../config/db');

exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  const { username, password, email, role } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Users (username, password, email, role) VALUES (?, ?, ?, ?)',
      [username, password, email, role]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
