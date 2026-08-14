const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());

// CREATE: Add a new student (Parameterized)
app.post('/students', async (req, res) => {
  const { name } = req.body;
  try {
    const [result] = await pool.execute(
      'INSERT INTO students (name) VALUES (?)', 
      [name]
    );
    res.status(201).json({ id: result.insertId, name });
  } catch (err) {
    res.status(500).json({ error: 'Database operation failed.' });
  }
});

// READ: Get all students
app.get('/students', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM students');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database operation failed.' });
  }
});

// UPDATE: Update a student's name (Parameterized)
app.put('/students/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await pool.execute(
      'UPDATE students SET name = ? WHERE student_id = ?', 
      [name, id]
    );
    res.json({ message: 'Student updated successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Database operation failed.' });
  }
});

// DELETE: Remove a student (Parameterized)
app.delete('/students/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.execute(
      'DELETE FROM students WHERE student_id = ?', 
      [id]
    );
    res.json({ message: 'Student deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Database operation failed.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});