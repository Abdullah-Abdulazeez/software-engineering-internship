CREATE Database student_management2;
 USE student_management2;
-- Create Students table
 CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
 );

-- Create Courses table
 CREATE TABLE courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(100) NOT NULL
);


 CREATE TABLE enrollments (
    enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    course_id INT,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);


 INSERT INTO students (name) VALUES 
('John'), 
('Mary'), 
('David'), 
('Sarah'); -- Sarah has no enrollments

 INSERT INTO courses (course_name) VALUES 
('Java'), 
('SQL'), 
('Web Development'), 
('Python'); -- Python has no students enrolled

 INSERT INTO enrollments (student_id, course_id) VALUES 
(1, 1), -- John -> Java
(1, 2), -- John -> SQL
(1, 3), -- John -> Web Development
(2, 1), -- Mary -> Java
(2, 4), -- Mary -> Python
(2, 2), -- Mary -> SQL
(3, 2); -- David -> SQL

SELECT 
    s.name AS Student_Name, 
    c.course_name AS Course
FROM students s
INNER JOIN enrollments e ON s.student_id = e.student_id
INNER JOIN courses c ON e.course_id = c.course_id;

SELECT 
    c.course_name AS Course, 
    s.name AS Student_Name
FROM courses c
INNER JOIN enrollments e ON c.course_id = e.course_id
INNER JOIN students s ON e.student_id = s.student_id
WHERE c.course_name = 'Java';

SELECT 
    c.course_name AS Course, 
    COUNT(e.student_id) AS Total_Students
FROM courses c
LEFT JOIN enrollments e ON c.course_id = e.course_id
GROUP BY c.course_id, c.course_name;

SELECT 
    s.student_id, 
    s.name AS Student_Name
FROM students s
LEFT JOIN enrollments e ON s.student_id = e.student_id
WHERE e.enrollment_id IS NULL;