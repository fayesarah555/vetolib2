const pool = require('../config/db');

exports.getAllMedicalRecords = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM MedicalRecords');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createMedicalRecord = async (req, res) => {
  const { animal_id, vet_id, visit_date, diagnosis, treatment, notes } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO MedicalRecords (animal_id, vet_id, visit_date, diagnosis, treatment, notes) VALUES (?, ?, ?, ?, ?, ?)',
      [animal_id, vet_id, visit_date, diagnosis, treatment, notes]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
