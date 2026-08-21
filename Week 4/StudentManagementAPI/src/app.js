require('dotenv').config();
const express = require('express');
const cors = require('cors');
const StudentController = require('./controller/studentController');
const CourseController = require('./controller/courseController');

const app = express();

app.use(cors());
app.use(express.json());

// Student Endpoints
app.get('/api/students', StudentController.getAllStudents);
app.get('/api/students/:id', StudentController.getStudentById);
app.post('/api/students', StudentController.createStudent);
app.put('/api/students/:id', StudentController.updateStudent);
app.delete('/api/students/:id', StudentController.deleteStudent);

// Course Endpoints
app.get('/api/courses', CourseController.getAllCourses);
app.get('/api/courses/:id', CourseController.getCourseById);
app.post('/api/courses', CourseController.createCourse);
app.put('/api/courses/:id', CourseController.updateCourse);
app.delete('/api/courses/:id', CourseController.deleteCourse);

// Global 404 Handler
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Student Management REST API running on http://localhost:${PORT}`);
});