require('dotenv').config();
const express = require('express');
const cors = require('cors');
const AuthController = require('./controller/authController');
const StudentController = require('./controller/studentController');
const CourseController = require('./controller/courseController');
const authenticateToken = require('./middleware/authMiddleware');
const authorizeRole = require('./middleware/authorizeRole');
const errorHandler = require('./middleware/errorHandler'); 
const app = express();

app.use(cors());
app.use(express.json());


// Public Auth Endpoints
app.post('/api/auth/register', AuthController.register);
app.post('/api/auth/login', AuthController.login);

// Student Endpoints
app.get('/api/students', authenticateToken, StudentController.getAllStudents);
app.get('/api/students/:id', authenticateToken, StudentController.getStudentById);

// Staff & Admin can create and update students
app.post('/api/students', authenticateToken, authorizeRole('ADMIN', 'STAFF'), StudentController.createStudent);
app.put('/api/students/:id', authenticateToken, authorizeRole('ADMIN', 'STAFF'), StudentController.updateStudent);

// ONLY Admin can delete students
app.delete('/api/students/:id', authenticateToken, authorizeRole('ADMIN'), StudentController.deleteStudent);

// Course Endpoints
app.get('/api/courses', authenticateToken, CourseController.getAllCourses);
app.post('/api/courses', authenticateToken, authorizeRole('ADMIN', 'STAFF'), CourseController.createCourse);
app.delete('/api/courses/:id', authenticateToken, authorizeRole('ADMIN'), CourseController.deleteCourse);

// Global 404 Handler
app.use((req, res) => {
  res.status(404).json({ status: 404, message: `Route ${req.method} ${req.originalUrl} not found` });
});

const PORT = process.env.PORT || 5000;
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Student Management REST API running on http://localhost:${PORT}`);
});