const CourseService = require('../service/courseService');

class CourseController {
  static async getAllCourses(req, res) {
    try {
      const courses = await CourseService.getAllCourses();
      return res.status(200).json(courses);
    } catch (err) {
      return res.status(err.statusCode || 500).json({ status: err.statusCode || 500, message: err.message });
    }
  }

  static async createCourse(req, res) {
    try {
      const course = await CourseService.createCourse(req.body);
      return res.status(201).json({ message: 'Course created successfully', data: course });
    } catch (err) {
      return res.status(err.statusCode || 500).json({ status: err.statusCode || 500, message: err.message });
    }
  }

  static async deleteCourse(req, res) {
    try {
      const result = await CourseService.deleteCourse(req.params.id);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(err.statusCode || 500).json({ status: err.statusCode || 500, message: err.message });
    }
  }
}

module.exports = CourseController;