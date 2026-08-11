create database student_management;
use student_management;
create table Students (
	id int auto_increment primary key,
    Firstname varchar(150),
  	Lastname varchar(150),
	 age int,
    email varchar(180),
    department varchar(50),
    course varchar(100)
    );
insert into Students(id, Firstname, Lastname, age, email, department, course) values(1, "Adekoya", "Abdulrahman", 19, "adekoyarahman@gmail.com", "Computer Science", "Algorithm" );
insert into Students(Firstname, Lastname, age, email, department, course) values("AbdulFatai","Adekoya", 20, "fataiadekoya@gmail.com" , "Physics", "Introduction to physics");
insert into Students(Lastname, Firstname, age, email, department, course) values("Yunus", "Yusrah", 18, "yurah2025@gmail.com", "Nursing", "Phsiotherapy");
insert into Students(Lastname, Firstname, age, email, department, course) values("Abdulazeez", "Musa", 21, "musathestrong@gmail.com", "Game Development", "Introduction to Game Development");
insert into Students(Lastname, Firstname, age, email, department, course) values("Olawunmi", "Bolanle", 20, "bolapop@gmail.com", "Mathematics", "Inroduction to Algebra");
insert into Students(Lastname, Firstname, age, email, department, course) values("Lexley", "Sade", 20, "lexley0001@gmail.com", "Art", "English as a form of expression");
insert into Students(Lastname, Firstname, age, email, department, course) values("Golden", "Samiat", 19, "goldenbaby@gmail.com", "Business Management","Introduction to Estate Managemnet");
insert into Students(Lastname, Firstname, age, email, department, course) values("Ogunwole", "Adekunle", 22, "kunlewole@gmail.com", "Chemistry", "Introduction to Organic Chemistry");
insert into Students(Lastname, Firstname, age, email, department, course) values("Folorunsho", "Benjamin", 20, "benjy@gmail.com", "Animal Production", "Bilogy in Farm Work");
insert into Students(Lastname, Firstname, age, email, department, course) values("Ali", "Sanni", 19, "alithehustler@gmail.com", "Software Engineering", "Introduction to Software Engineering");
insert into Students(Lastname, Firstname, age, email, department, course) values("Alex", "Courtney", 20, "courtneylex@gmal.com", "Computer Science", "Algorithm");
select * from Students;
select * from Students where Lastname = "Golden";
select * from Students where email = "kunlewole@gmail.com";
ALTER TABLE Students ADD COLUMN PhoneNumber VARCHAR(20);
insert into Students(PhoneNumber) values("08123458790");
-- 1. Turn off safe mode
SET SQL_SAFE_UPDATES = 0;

-- 2. Run your delete query
DELETE FROM Students 
WHERE PhoneNumber = '08123458790';

-- 3. Turn safe mode back on (good safety practice)
SET SQL_SAFE_UPDATES = 1;
UPDATE Students SET PhoneNumber = '08123458790' WHERE id = 1;
UPDATE Students SET PhoneNumber = CASE id
    WHEN 1 THEN '08123458701'
	WHEN 2 THEN '08123458702'
    WHEN 3 THEN '08123458703'
    WHEN 4 THEN '08123458704'
	WHEN 5 THEN '08123458705'
    WHEN 6 THEN '08123458706'
    WHEN 7 THEN '08123458707'
    WHEN 8 THEN '08123458708'
    WHEN 9 THEN '08123458709'
	WHEN 10 THEN '08123458710'
END
 WHERE id IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
UPDATE Students  set Firstname = "Alexa" where id = 8;
