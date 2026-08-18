require('dotenv').config();
const express = require('express');
const cors = require('cors');
const StudentController = require('./controller/studentController');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/students', StudentController.getAllStudents);
app.get('/api/students/:id', StudentController.getStudentById);

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Student Management API running on http://localhost:${PORT}`);
});