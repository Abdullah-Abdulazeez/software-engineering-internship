const pool = require('../config/db');

class CourseRepository {
  static async findAll() {
    const [rows] = await pool.query(
      'SELECT course_id AS id, course_code AS courseCode, course_name AS courseName, credit_unit AS creditUnit FROM courses ORDER BY course_id DESC'
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT course_id AS id, course_code AS courseCode, course_name AS courseName, credit_unit AS creditUnit FROM courses WHERE course_id = ?',
      [id]
    );
    return rows[0] || null;
  }

  static async findByCode(code) {
    const [rows] = await pool.execute(
      'SELECT course_id AS id, course_code AS courseCode, course_name AS courseName, credit_unit AS creditUnit FROM courses WHERE course_code = ?',
      [code]
    );
    return rows[0] || null;
  }

  static async create(courseCode, courseName, creditUnit) {
    const [result] = await pool.execute(
      'INSERT INTO courses (course_code, course_name, credit_unit) VALUES (?, ?, ?)',
      [courseCode, courseName, creditUnit || 3]
    );
    return result.insertId;
  }

  static async delete(id) {
    const [result] = await pool.execute(
      'DELETE FROM courses WHERE course_id = ?',
      [id]
    );
    return result.affectedRows;
  }
}

module.exports = CourseRepository;