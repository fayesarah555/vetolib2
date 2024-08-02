const pool = require('../config/db');

exports.getAllAnimals = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Animals');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createAnimal = async (req, res) => {
  const { owner_id, name, species, breed, date_of_birth, gender, microchip_number } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Animals (owner_id, name, species, breed, date_of_birth, gender, microchip_number) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [owner_id, name, species, breed, date_of_birth, gender, microchip_number]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
