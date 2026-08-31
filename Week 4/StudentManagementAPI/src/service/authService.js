const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repository/userRepository');

class AuthService {
  static async register(data) {
    const { name, email, password, role } = data;

    if (!name || !email || !password) {
      const err = new Error('Name, email, and password are required.');
      err.statusCode = 400;
      throw err;
    }

    const existingUser = await UserRepository.findByEmail(email.trim().toLowerCase());
    if (existingUser) {
      const err = new Error(`Email '${email}' is already registered.`);
      err.statusCode = 400;
      throw err;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const userId = await UserRepository.create(
      name.trim(),
      email.trim().toLowerCase(),
      passwordHash,
      role || 'STAFF'
    );

    return {
      id: userId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role: role || 'STAFF',
    };
  }

  static async login(email, password) {
    if (!email || !password) {
      const err = new Error('Email and password are required.');
      err.statusCode = 400;
      throw err;
    }

    const user = await UserRepository.findByEmail(email.trim().toLowerCase());
    if (!user) {
      const err = new Error('Invalid email or password.');
      err.statusCode = 401;
      throw err;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      const err = new Error('Invalid email or password.');
      err.statusCode = 401;
      throw err;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}

module.exports = AuthService;