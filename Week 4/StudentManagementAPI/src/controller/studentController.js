const StudentRepository = require('../repository/studentRepository');

class StudentController {
  // GET /api/students
  static async getAllStudents(req, res) {
    try {
      const students = await StudentRepository.findAll();
      return res.status(200).json(students);
    } catch (error) {
      console.error('Error fetching students:', error);
      return res.status(500).json({
        status: 500,
        message: 'Internal server error while retrieving students'
      });
    }
  }

  // GET /api/students/:id
  static async getStudentById(req, res) {
    const { id } = req.params;

    // Validate if ID is a positive integer
    if (isNaN(id) || parseInt(id, 10) <= 0) {
      return res.status(400).json({
        status: 400,
        message: 'Invalid student ID supplied. Must be a valid numeric ID.'
      });
    }

    try {
      const student = await StudentRepository.findById(id);

      if (!student) {
        return res.status(404).json({
          status: 404,
          message: `Student with ID ${id} not found`
        });
      }

      return res.status(200).json(student);
    } catch (error) {
      console.error(`Error fetching student ${id}:`, error);
      return res.status(500).json({
        status: 500,
        message: 'Internal server error while retrieving the student'
      });
    }
  }
}

module.exports = StudentController;