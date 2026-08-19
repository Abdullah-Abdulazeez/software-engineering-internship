const pool = require('../config/db');

class StudentRepository {
  // Fetch all students
  static async findAll() {
    const [rows] = await pool.query(
      'SELECT student_id AS id, first_name AS firstName, last_name AS lastName, email, phone FROM students'
    );
    return rows;
  }

  // Fetch student by ID
  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT student_id AS id, first_name AS firstName, last_name AS lastName, email, phone FROM students WHERE student_id = ?',
      [id]
    );
    return rows[0] || null;
  }

  // Fetch student by email (used for duplicate checks)
  static async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT student_id AS id, first_name AS firstName, last_name AS lastName, email, phone FROM students WHERE email = ?',
      [email]
    );
    return rows[0] || null;
  }

  // Create new student
  static async create(firstName, lastName, email, phone) {
    const [result] = await pool.execute(
      'INSERT INTO students (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)',
      [firstName, lastName, email, phone || null]
    );
    return result.insertId;
  }

  // Update existing student
  static async update(id, firstName, lastName, email, phone) {
    const [result] = await pool.execute(
      'UPDATE students SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE student_id = ?',
      [firstName, lastName, email, phone || null, id]
    );
    return result.affectedRows;
  }

  // Delete student
  static async delete(id) {
    const [result] = await pool.execute(
      'DELETE FROM students WHERE student_id = ?',
      [id]
    );
    return result.affectedRows;
  }
}

module.exports = StudentRepository;