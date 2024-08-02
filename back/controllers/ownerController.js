const pool = require('../config/db');

exports.getAllOwners = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Owners');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOwner = async (req, res) => {
  const { user_id, first_name, last_name, phone, address } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Owners (user_id, first_name, last_name, phone, address) VALUES (?, ?, ?, ?, ?)',
      [user_id, first_name, last_name, phone, address]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
