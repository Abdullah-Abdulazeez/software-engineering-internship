const CourseRepository = require('../repository/courseRepository');

class CourseService {
  static async getAllCourses() {
    return await CourseRepository.findAll();
  }

  static async createCourse(data) {
    const { courseCode, courseName, creditUnit } = data;
    if (!courseCode || !courseName) {
      const err = new Error('courseCode and courseName are required');
      err.statusCode = 400;
      throw err;
    }

    const existing = await CourseRepository.findByCode(courseCode.trim().toUpperCase());
    if (existing) {
      const err = new Error(`Course code '${courseCode}' is already registered`);
      err.statusCode = 400;
      throw err;
    }

    const id = await CourseRepository.create(
      courseCode.trim().toUpperCase(),
      courseName.trim(),
      creditUnit || 3
    );

    return {
      id,
      courseCode: courseCode.trim().toUpperCase(),
      courseName: courseName.trim(),
      creditUnit: creditUnit || 3,
    };
  }

  static async deleteCourse(id) {
    const parsedId = parseInt(id, 10);
    const course = await CourseRepository.findById(parsedId);
    if (!course) {
      const err = new Error(`Course #${id} not found`);
      err.statusCode = 404;
      throw err;
    }
    await CourseRepository.delete(parsedId);
    return { message: `Course #${id} deleted successfully` };
  }
}

module.exports = CourseService;