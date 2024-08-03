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
  const { user_id, name, species, breed, date_of_birth, gender, microchip_number } = req.body;

  // Log incoming request data
  console.log('Received createAnimal request with data:', req.body);

  try {
    // Validate the gender
    if (!['male', 'female'].includes(gender)) {
      return res.status(400).json({ error: 'Invalid gender value' });
    }

    // Insert animal into the database
    const [result] = await pool.query(
      'INSERT INTO Animals (user_id, name, species, breed, date_of_birth, gender, microchip_number) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [user_id, name, species, breed, date_of_birth, gender, microchip_number]
    );

    // Respond with the inserted ID
    res.json({ id: result.insertId });
  } catch (err) {
    // Log the error for debugging
    console.error('Error creating animal:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

