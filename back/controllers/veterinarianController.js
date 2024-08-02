const pool = require('../config/db');

exports.getAllVeterinarians = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Veterinarians');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createVeterinarian = async (req, res) => {
  const { user_id, first_name, last_name, specialization, phone, clinic_address } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Veterinarians (user_id, first_name, last_name, specialization, phone, clinic_address) VALUES (?, ?, ?, ?, ?, ?)',
      [user_id, first_name, last_name, specialization, phone, clinic_address]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
