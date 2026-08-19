const StudentRepository = require('../repository/studentRepository');

// Helper to validate email syntax
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

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

    if (isNaN(id) || parseInt(id, 10) <= 0) {
      return res.status(400).json({
        status: 400,
        message: 'Invalid student ID. ID must be a positive integer.'
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

  // POST /api/students
  static async createStudent(req, res) {
    const { firstName, lastName, email, phone } = req.body;

    // Validation: Required fields
    if (!firstName || !lastName || !email) {
      return res.status(400).json({
        status: 400,
        message: 'Validation error: firstName, lastName, and email are required fields.'
      });
    }

    // Validation: Email format
    if (!isValidEmail(email)) {
      return res.status(400).json({
        status: 400,
        message: 'Validation error: Invalid email format.'
      });
    }

    try {
      // Validation: Duplicate email check
      const existingStudent = await StudentRepository.findByEmail(email);
      if (existingStudent) {
        return res.status(400).json({
          status: 400,
          message: `Validation error: Email '${email}' is already registered.`
        });
      }

      const newStudentId = await StudentRepository.create(
        firstName.trim(),
        lastName.trim(),
        email.trim().toLowerCase(),
        phone ? phone.trim() : null
      );

      return res.status(201).json({
        message: 'Student registered successfully',
        data: {
          id: newStudentId,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone ? phone.trim() : null
        }
      });
    } catch (error) {
      console.error('Error creating student:', error);
      return res.status(500).json({
        status: 500,
        message: 'Internal server error while creating the student'
      });
    }
  }

  // PUT /api/students/:id
  static async updateStudent(req, res) {
    const { id } = req.params;
    const { firstName, lastName, email, phone } = req.body;

    if (isNaN(id) || parseInt(id, 10) <= 0) {
      return res.status(400).json({
        status: 400,
        message: 'Invalid student ID. ID must be a positive integer.'
      });
    }

    if (!firstName || !lastName || !email) {
      return res.status(400).json({
        status: 400,
        message: 'Validation error: firstName, lastName, and email are required fields.'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        status: 400,
        message: 'Validation error: Invalid email format.'
      });
    }

    try {
      // Check if student exists
      const student = await StudentRepository.findById(id);
      if (!student) {
        return res.status(404).json({
          status: 404,
          message: `Student with ID ${id} not found`
        });
      }

      // Check if updating email conflicts with another student's email
      const studentWithSameEmail = await StudentRepository.findByEmail(email);
      if (studentWithSameEmail && studentWithSameEmail.id !== parseInt(id, 10)) {
        return res.status(400).json({
          status: 400,
          message: `Validation error: Email '${email}' is already in use by another student.`
        });
      }

      await StudentRepository.update(
        id,
        firstName.trim(),
        lastName.trim(),
        email.trim().toLowerCase(),
        phone ? phone.trim() : null
      );

      return res.status(200).json({
        message: 'Student updated successfully',
        data: {
          id: parseInt(id, 10),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone ? phone.trim() : null
        }
      });
    } catch (error) {
      console.error(`Error updating student ${id}:`, error);
      return res.status(500).json({
        status: 500,
        message: 'Internal server error while updating the student'
      });
    }
  }

  // DELETE /api/students/:id
  static async deleteStudent(req, res) {
    const { id } = req.params;

    if (isNaN(id) || parseInt(id, 10) <= 0) {
      return res.status(400).json({
        status: 400,
        message: 'Invalid student ID. ID must be a positive integer.'
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

      await StudentRepository.delete(id);
      return res.status(200).json({
        message: `Student with ID ${id} deleted successfully`
      });
    } catch (error) {
      console.error(`Error deleting student ${id}:`, error);
      return res.status(500).json({
        status: 500,
        message: 'Internal server error while deleting the student'
      });
    }
  }
}

module.exports = StudentController;