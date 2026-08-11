USE student_management;
SELECT * FROM Students;
SELECT Firstname, Lastname FROM Students;
SELECT * FROM Students WHERE email = 'yurah2025@gmail.com';
SELECT * FROM Students WHERE Firstname LIKE 'A%' OR Lastname LIKE 'A%';
UPDATE Students SET PhoneNumber = '08012345678' 
WHERE id = 1;
DELETE FROM Students 
WHERE id = 1;
SELECT COUNT(*) AS total_students FROM Students;