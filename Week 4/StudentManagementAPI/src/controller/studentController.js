const StudentService = require('../service/studentService');

class StudentController {
  // GET /api/students
  static async getAllStudents(req, res) {
    try {
      const students = await StudentService.getAllStudents();
      return res.status(200).json(students);
    } catch (error) {
      console.error('Error in getAllStudents:', error);
      const status = error.statusCode || 500;
      return res.status(status).json({
        status,
        message: error.message || 'Internal server error while retrieving students.'
      });
    }
  }

  // GET /api/students/:id
  static async getStudentById(req, res) {
    try {
      const student = await StudentService.getStudentById(req.params.id);
      return res.status(200).json(student);
    } catch (error) {
      console.error(`Error in getStudentById (${req.params.id}):`, error);
      const status = error.statusCode || 500;
      return res.status(status).json({
        status,
        message: error.message || 'Internal server error.'
      });
    }
  }

  // POST /api/students
  static async createStudent(req, res) {
    try {
      const newStudent = await StudentService.createStudent(req.body);
      return res.status(201).json({
        message: 'Student registered successfully',
        data: newStudent
      });
    } catch (error) {
      console.error('Error in createStudent:', error);
      const status = error.statusCode || 500;
      return res.status(status).json({
        status,
        message: error.message || 'Internal server error.'
      });
    }
  }

  // PUT /api/students/:id
  static async updateStudent(req, res) {
    try {
      const updatedStudent = await StudentService.updateStudent(req.params.id, req.body);
      return res.status(200).json({
        message: 'Student updated successfully',
        data: updatedStudent
      });
    } catch (error) {
      console.error(`Error in updateStudent (${req.params.id}):`, error);
      const status = error.statusCode || 500;
      return res.status(status).json({
        status,
        message: error.message || 'Internal server error.'
      });
    }
  }

  // DELETE /api/students/:id
  static async deleteStudent(req, res) {
    try {
      const result = await StudentService.deleteStudent(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      console.error(`Error in deleteStudent (${req.params.id}):`, error);
      const status = error.statusCode || 500;
      return res.status(status).json({
        status,
        message: error.message || 'Internal server error.'
      });
    }
  }
}

module.exports = StudentController;