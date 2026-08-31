CREATE DATABASE IF NOT EXISTS student_management;
USE student_management;

DROP TABLE IF EXISTS enrollments;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS courses;

CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20)
);

CREATE TABLE courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_code VARCHAR(20) NOT NULL UNIQUE,
    course_name VARCHAR(100) NOT NULL,
    credit_unit INT DEFAULT 3
);

-- Seed initial test records
INSERT INTO students (first_name, last_name, email, phone) VALUES
('Ahmed', 'Bello', 'ahmed.bello@example.com', '08012345678'),
('Sarah', 'Musa', 'sarah.musa@example.com', '08087654321');

INSERT INTO courses (course_code, course_name, credit_unit) VALUES
('CSC301', 'Data Structures & Algorithms', 3),
('CSC305', 'Database Systems', 3);