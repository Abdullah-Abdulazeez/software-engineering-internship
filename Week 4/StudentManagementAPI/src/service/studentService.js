const StudentRepository = require('../repository/studentRepository');

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

class StudentService {
  static async getAllStudents() {
    return await StudentRepository.findAll();
  }

  static async getStudentById(id) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId) || parsedId <= 0) {
      const err = new Error('Invalid student ID');
      err.statusCode = 400;
      throw err;
    }
    const student = await StudentRepository.findById(parsedId);
    if (!student) {
      const err = new Error(`Student with ID ${id} not found`);
      err.statusCode = 404;
      throw err;
    }
    return student;
  }

  static async createStudent(data) {
    const { firstName, lastName, email, phone } = data;
    if (!firstName || !lastName || !email) {
      const err = new Error('firstName, lastName, and email are required');
      err.statusCode = 400;
      throw err;
    }
    if (!isValidEmail(email)) {
      const err = new Error('Invalid email format');
      err.statusCode = 400;
      throw err;
    }

    const existing = await StudentRepository.findByEmail(email.trim().toLowerCase());
    if (existing) {
      const err = new Error(`Email '${email}' is already registered`);
      err.statusCode = 400;
      throw err;
    }

    const id = await StudentRepository.create(
      firstName.trim(),
      lastName.trim(),
      email.trim().toLowerCase(),
      phone ? phone.trim() : null
    );

    return {
      id,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : null,
    };
  }

  static async updateStudent(id, data) {
    const student = await this.getStudentById(id);
    const { firstName, lastName, email, phone } = data;

    if (!firstName || !lastName || !email) {
      const err = new Error('firstName, lastName, and email are required');
      err.statusCode = 400;
      throw err;
    }
    if (!isValidEmail(email)) {
      const err = new Error('Invalid email format');
      err.statusCode = 400;
      throw err;
    }

    const emailOwner = await StudentRepository.findByEmail(email.trim().toLowerCase());
    if (emailOwner && emailOwner.id !== student.id) {
      const err = new Error(`Email '${email}' is already in use by another student`);
      err.statusCode = 400;
      throw err;
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
      phone: phone ? phone.trim() : null,
    };
  }

  static async deleteStudent(id) {
    const student = await this.getStudentById(id);
    await StudentRepository.delete(student.id);
    return { message: `Student #${student.id} deleted successfully` };
  }
}

module.exports = StudentService;