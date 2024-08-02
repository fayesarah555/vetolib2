const pool = require('../config/db');

exports.getAllMedications = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Medications');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createMedication = async (req, res) => {
  const { record_id, name, dosage, administration_route, duration } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Medications (record_id, name, dosage, administration_route, duration) VALUES (?, ?, ?, ?, ?)',
      [record_id, name, dosage, administration_route, duration]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
