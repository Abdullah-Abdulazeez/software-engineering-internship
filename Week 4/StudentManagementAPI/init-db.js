require('dotenv').config();
const mysql = require('mysql2/promise');

async function setup() {
  console.log('Connecting to cloud database...');
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'defaultdb',
    ssl: { rejectUnauthorized: false }
  });

  console.log('Connected! Creating tables...');

  await connection.query(`
    CREATE TABLE IF NOT EXISTS students (
      student_id INT PRIMARY KEY AUTO_INCREMENT,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      phone VARCHAR(20)
    );
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS courses (
      course_id INT PRIMARY KEY AUTO_INCREMENT,
      course_code VARCHAR(20) NOT NULL UNIQUE,
      course_name VARCHAR(100) NOT NULL,
      credit_unit INT DEFAULT 3
    );
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      user_id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      role ENUM('ADMIN', 'STAFF', 'STUDENT') DEFAULT 'STAFF',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log('Tables created successfully!');
  await connection.end();
}

setup().catch(err => console.error('Database setup failed:', err));