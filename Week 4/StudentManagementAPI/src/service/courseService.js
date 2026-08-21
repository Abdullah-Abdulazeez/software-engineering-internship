const CourseRepository = require('../repository/courseRepository');

class CourseService {
  static async getAllCourses() {
    return await CourseRepository.findAll();
  }

  static async getCourseById(id) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId) || parsedId <= 0) {
      const err = new Error('Invalid course ID. Must be a positive integer.');
      err.statusCode = 400;
      throw err;
    }
    const course = await CourseRepository.findById(parsedId);
    if (!course) {
      const err = new Error(`Course with ID ${id} not found.`);
      err.statusCode = 404;
      throw err;
    }
    return course;
  }

  static async createCourse(data) {
    const { courseCode, courseName, creditUnit } = data;
    if (!courseCode || !courseName) {
      const err = new Error('courseCode and courseName are required.');
      err.statusCode = 400;
      throw err;
    }

    const existing = await CourseRepository.findByCode(courseCode.trim().toUpperCase());
    if (existing) {
      const err = new Error(`Course code '${courseCode}' is already registered.`);
      err.statusCode = 400;
      throw err;
    }

    const newId = await CourseRepository.create(
      courseCode.trim().toUpperCase(),
      courseName.trim(),
      creditUnit || 3
    );

    return {
      id: newId,
      courseCode: courseCode.trim().toUpperCase(),
      courseName: courseName.trim(),
      creditUnit: creditUnit || 3
    };
  }

  static async updateCourse(id, data) {
    const course = await this.getCourseById(id);
    const { courseCode, courseName, creditUnit } = data;

    if (!courseCode || !courseName) {
      const err = new Error('courseCode and courseName are required.');
      err.statusCode = 400;
      throw err;
    }

    await CourseRepository.update(
      course.id,
      courseCode.trim().toUpperCase(),
      courseName.trim(),
      creditUnit || 3
    );

    return {
      id: course.id,
      courseCode: courseCode.trim().toUpperCase(),
      courseName: courseName.trim(),
      creditUnit: creditUnit || 3
    };
  }

  static async deleteCourse(id) {
    const course = await this.getCourseById(id);
    await CourseRepository.delete(course.id);
    return { message: `Course with ID ${course.id} deleted successfully.` };
  }
}

module.exports = CourseService;