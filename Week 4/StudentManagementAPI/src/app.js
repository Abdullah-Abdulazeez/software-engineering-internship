require('dotenv').config();
const express = require('express');
const cors = require('cors');
const AuthController = require('./controller/authController');
const StudentController = require('./controller/studentController');
const CourseController = require('./controller/courseController');
const authenticateToken = require('./middleware/authMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

// Public Auth Endpoints
app.post('/api/auth/register', AuthController.register);
app.post('/api/auth/login', AuthController.login);

// Student Endpoints (Protected: POST, PUT, DELETE require Token)
app.get('/api/students', StudentController.getAllStudents);
app.get('/api/students/:id', StudentController.getStudentById);
app.post('/api/students', authenticateToken, StudentController.createStudent);
app.put('/api/students/:id', authenticateToken, StudentController.updateStudent);
app.delete('/api/students/:id', authenticateToken, StudentController.deleteStudent);

// Course Endpoints
app.get('/api/courses', CourseController.getAllCourses);
app.post('/api/courses', authenticateToken, CourseController.createCourse);
app.delete('/api/courses/:id', authenticateToken, CourseController.deleteCourse);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Student Management REST API running on http://localhost:${PORT}`);
});