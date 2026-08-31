const pool = require('../config/db');

class UserRepository {
  static async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT user_id AS id, name, email, password_hash AS passwordHash, role FROM users WHERE email = ?',
      [email]
    );
    return rows[0] || null;
  }

  static async create(name, email, passwordHash, role = 'STAFF') {
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [name, email, passwordHash, role]
    );
    return result.insertId;
  }
}

module.exports = UserRepository;