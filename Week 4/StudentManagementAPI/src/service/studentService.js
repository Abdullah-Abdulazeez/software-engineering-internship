const StudentRepository = require('../repository/studentRepository');

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

class StudentService {
  static async getAllStudents() {
    return await StudentRepository.findAll();
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
}

module.exports = StudentService;