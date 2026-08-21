const StudentService = require('../service/studentService');

class StudentController {
  static async getAllStudents(req, res) {
    try {
      const students = await StudentService.getAllStudents();
      return res.status(200).json(students);
    } catch (error) {
      console.error('Error in getAllStudents:', error);
      return res.status(500).json({
        status: 500,
        message: 'Internal server error while retrieving students.'
      });
    }
  }

  static async getStudentById(req, res) {
    try {
      const student = await StudentService.getStudentById(req.params.id);
      return res.status(200).json(student);
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({
        status,
        message: error.message || 'Internal server error.'
      });
    }
  }

  static async createStudent(req, res) {
    try {
      const newStudent = await StudentService.createStudent(req.body);
      return res.status(201).json({
        message: 'Student registered successfully',
        data: newStudent
      });
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({
        status,
        message: error.message || 'Internal server error.'
      });
    }
  }

  static async updateStudent(req, res) {
    try {
      const updatedStudent = await StudentService.updateStudent(req.params.id, req.body);
      return res.status(200).json({
        message: 'Student updated successfully',
        data: updatedStudent
      });
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({
        status,
        message: error.message || 'Internal server error.'
      });
    }
  }

  static async deleteStudent(req, res) {
    try {
      const result = await StudentService.deleteStudent(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({
        status,
        message: error.message || 'Internal server error.'
      });
    }
  }
}

module.exports = StudentController;