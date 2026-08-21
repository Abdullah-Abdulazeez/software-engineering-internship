# Student Management REST API - Version 1.0

A modular, layered RESTful backend API for managing students and courses, built with Node.js, Express.js, and MySQL.

## Technologies Used
- **Backend Runtime:** Node.js
- **Web Framework:** Express.js
- **Database:** MySQL 8.0
- **Database Driver:** mysql2/promise (Connection Pooling & Prepared Statements)
- **API Testing:** Postman

## Project Architecture
The project strictly follows a layered architecture to decouple HTTP handling, business rules, and database persistence:
`Client / Postman` -> `Controller` -> `Service` -> `Repository` -> `MySQL Database`

## Features
- Complete CRUD operations for Students and Courses
- Input validation (name requirements, regex email validation, numeric ID checks)
- Duplicate email & course code prevention
- Parameterized SQL queries preventing SQL Injection
- Standardized JSON responses and uniform error handling

## Database Setup
1. Open your MySQL client (MySQL Workbench or command line).

2. Run the schema creation script:

CREATE DATABASE IF NOT EXISTS student_management;
USE student_management;

CREATE TABLE IF NOT EXISTS students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_code VARCHAR(20) NOT NULL UNIQUE,
    course_name VARCHAR(100) NOT NULL,
    credit_unit INT DEFAULT 3
);