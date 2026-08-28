const StudentService = require('../service/studentService');

class StudentController {
  static async getAllStudents(req, res) {
    try {
      const students = await StudentService.getAllStudents();
      return res.status(200).json(students);
    } catch (err) {
      return res.status(err.statusCode || 500).json({ status: err.statusCode || 500, message: err.message });
    }
  }

  static async getStudentById(req, res) {
    try {
      const student = await StudentService.getStudentById(req.params.id);
      return res.status(200).json(student);
    } catch (err) {
      return res.status(err.statusCode || 500).json({ status: err.statusCode || 500, message: err.message });
    }
  }

  static async createStudent(req, res) {
    try {
      const student = await StudentService.createStudent(req.body);
      return res.status(201).json({ message: 'Student registered successfully', data: student });
    } catch (err) {
      return res.status(err.statusCode || 500).json({ status: err.statusCode || 500, message: err.message });
    }
  }

  static async updateStudent(req, res) {
    try {
      const student = await StudentService.updateStudent(req.params.id, req.body);
      return res.status(200).json({ message: 'Student updated successfully', data: student });
    } catch (err) {
      return res.status(err.statusCode || 500).json({ status: err.statusCode || 500, message: err.message });
    }
  }

  static async deleteStudent(req, res) {
    try {
      const result = await StudentService.deleteStudent(req.params.id);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(err.statusCode || 500).json({ status: err.statusCode || 500, message: err.message });
    }
  }
}

module.exports = StudentController;