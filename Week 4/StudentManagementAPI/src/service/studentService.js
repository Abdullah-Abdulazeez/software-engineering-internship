const StudentRepository = require('../repository/studentRepository');

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

class StudentService {
  static async getAllStudents() {
    return await StudentRepository.findAll();
  }

  static async getStudentById(id) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId) || parsedId <= 0) {
      const error = new Error('Invalid student ID. Must be a positive numeric value.');
      error.statusCode = 400;
      throw error;
    }

    const student = await StudentRepository.findById(parsedId);
    if (!student) {
      const error = new Error(`Student with ID ${id} not found.`);
      error.statusCode = 404;
      throw error;
    }
    return student;
  }

  static async createStudent(data) {
    const { firstName, lastName, email, phone } = data;

    if (!firstName || !lastName || !email) {
      const error = new Error('firstName, lastName, and email are required fields.');
      error.statusCode = 400;
      throw error;
    }

    if (!isValidEmail(email)) {
      const error = new Error('Invalid email format.');
      error.statusCode = 400;
      throw error;
    }

    const existingStudent = await StudentRepository.findByEmail(email.trim().toLowerCase());
    if (existingStudent) {
      const error = new Error(`Email '${email}' is already registered.`);
      error.statusCode = 400;
      throw error;
    }

    const newId = await StudentRepository.create(
      firstName.trim(),
      lastName.trim(),
      email.trim().toLowerCase(),
      phone ? phone.trim() : null
    );

    return {
      id: newId,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : null
    };
  }

  static async updateStudent(id, data) {
    const student = await this.getStudentById(id);
    const { firstName, lastName, email, phone } = data;

    if (!firstName || !lastName || !email) {
      const error = new Error('firstName, lastName, and email are required fields.');
      error.statusCode = 400;
      throw error;
    }

    if (!isValidEmail(email)) {
      const error = new Error('Invalid email format.');
      error.statusCode = 400;
      throw error;
    }

    const studentWithEmail = await StudentRepository.findByEmail(email.trim().toLowerCase());
    if (studentWithEmail && studentWithEmail.id !== student.id) {
      const error = new Error(`Email '${email}' is already in use by another student.`);
      error.statusCode = 400;
      throw error;
    }

    await StudentRepository.update(
      student.id,
      firstName.trim(),
      lastName.trim(),
      email.trim().toLowerCase(),
      phone ? phone.trim() : null
    );

    return {
      id: student.id,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : null
    };
  }

  static async deleteStudent(id) {
    const student = await this.getStudentById(id);
    await StudentRepository.delete(student.id);
    return { message: `Student with ID ${student.id} deleted successfully.` };
  }
}

module.exports = StudentService;