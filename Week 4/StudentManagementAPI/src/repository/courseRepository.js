const pool = require('../config/db');

class CourseRepository {
  static async findAll() {
    const [rows] = await pool.query(
      'SELECT course_id AS id, course_code AS courseCode, course_name AS courseName, credit_unit AS creditUnit FROM courses'
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

  static async create(code, name, units) {
    const [result] = await pool.execute(
      'INSERT INTO courses (course_code, course_name, credit_unit) VALUES (?, ?, ?)',
      [code, name, units]
    );
    return result.insertId;
  }

  static async update(id, code, name, units) {
    const [result] = await pool.execute(
      'UPDATE courses SET course_code = ?, course_name = ?, credit_unit = ? WHERE course_id = ?',
      [code, name, units, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await pool.execute('DELETE FROM courses WHERE course_id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = CourseRepository;