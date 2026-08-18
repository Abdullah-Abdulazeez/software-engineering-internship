const pool = require('../config/db');

class StudentRepository {
  // Fetch all students
  static async findAll() {
    const [rows] = await pool.query(
      'SELECT student_id AS id, first_name AS firstName, last_name AS lastName, email, phone FROM students'
    );
    return rows;
  }

  // Fetch a student by ID
  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT student_id AS id, first_name AS firstName, last_name AS lastName, email, phone FROM students WHERE student_id = ?',
      [id]
    );
    return rows[0] || null;
  }
}

module.exports = StudentRepository;