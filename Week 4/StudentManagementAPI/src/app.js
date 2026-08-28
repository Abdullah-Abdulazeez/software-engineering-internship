require('dotenv').config();
const express = require('express');
const cors = require('cors');
const StudentController = require('./controller/studentController');
const CourseController = require('./controller/courseController');

const app = express();

app.use(cors());
app.use(express.json());

// Student Routes
app.get('/api/students', StudentController.getAllStudents);
app.get('/api/students/:id', StudentController.getStudentById);
app.post('/api/students', StudentController.createStudent);
app.put('/api/students/:id', StudentController.updateStudent);
app.delete('/api/students/:id', StudentController.deleteStudent);

// Course Routes
app.get('/api/courses', CourseController.getAllCourses);
app.post('/api/courses', CourseController.createCourse);
app.delete('/api/courses/:id', CourseController.deleteCourse);

// Global 404
app.use((req, res) => {
  res.status(404).json({ status: 404, message: `Cannot ${req.method} ${req.originalUrl}` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Student Management REST API running on http://localhost:${PORT}`);
});