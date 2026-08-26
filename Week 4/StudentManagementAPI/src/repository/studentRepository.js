const pool = require('../config/db');

class StudentRepository {
  static async findAll() {
    const [rows] = await pool.query(
      'SELECT student_id AS id, first_name AS firstName, last_name AS lastName, email, phone FROM students'
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT student_id AS id, first_name AS firstName, last_name AS lastName, email, phone FROM students WHERE student_id = ?',
      [id]
    );
    return rows[0] || null;
  }

  static async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT student_id AS id, first_name AS firstName, last_name AS lastName, email, phone FROM students WHERE email = ?',
      [email]
    );
    return rows[0] || null;
  }

static async create(firstName, lastName, email, phone) {
  const [result] = await pool.execute(
    'INSERT INTO students (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)',
    [firstName, lastName, email, phone || null]
  );
  return result.insertId;
}
}

module.exports = StudentRepository;