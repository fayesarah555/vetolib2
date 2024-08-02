const pool = require('../config/db');

exports.getAllAppointments = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Appointments');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createAppointment = async (req, res) => {
  const { animal_id, vet_id, appointment_date, appointment_time, reason, status } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Appointments (animal_id, vet_id, appointment_date, appointment_time, reason, status) VALUES (?, ?, ?, ?, ?, ?)',
      [animal_id, vet_id, appointment_date, appointment_time, reason, status]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
