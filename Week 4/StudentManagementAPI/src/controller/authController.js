const AuthService = require('../service/authService');

class AuthController {
  static async register(req, res) {
    try {
      const user = await AuthService.register(req.body);
      return res.status(201).json({ message: 'User registered successfully.', user });
    } catch (err) {
      return res.status(err.statusCode || 500).json({ status: err.statusCode || 500, message: err.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const data = await AuthService.login(email, password);
      return res.status(200).json({ message: 'Login successful.', ...data });
    } catch (err) {
      return res.status(err.statusCode || 500).json({ status: err.statusCode || 500, message: err.message });
    }
  }
}

module.exports = AuthController;