require('dotenv').config(); // <-- CRITICAL: Loads DB credentials for Jest
const request = require('supertest');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const pool = require('../src/config/db'); // Import the DB pool

const AuthController = require('../src/controller/authController');
const StudentController = require('../src/controller/studentController');
const authenticateToken = require('../src/middleware/authMiddleware');
const authorizeRole = require('../src/middleware/authorizeRole');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/auth/register', AuthController.register);
app.post('/api/auth/login', AuthController.login);
app.get('/api/students', authenticateToken, StudentController.getAllStudents);
app.post('/api/students', authenticateToken, authorizeRole('ADMIN', 'STAFF'), StudentController.createStudent);
app.delete('/api/students/:id', authenticateToken, authorizeRole('ADMIN'), StudentController.deleteStudent);

describe('Authentication & Student Management API Test Suite', () => {
  const adminToken = jwt.sign(
    { id: 1, email: 'admin.test@example.com', role: 'ADMIN' },
    process.env.JWT_SECRET || 'supersecret_jwt_key_internship_2026',
    { expiresIn: '1h' }
  );

  const staffToken = jwt.sign(
    { id: 2, email: 'staff.test@example.com', role: 'STAFF' },
    process.env.JWT_SECRET || 'supersecret_jwt_key_internship_2026',
    { expiresIn: '1h' }
  );

  // Close MySQL pool after all tests finish to eliminate open handles
  afterAll(async () => {
    await pool.end();
  });

  describe('Authentication Tests', () => {
    it('TC003: Should reject registration with missing fields', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'incomplete@example.com' });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message');
    });

    it('TC005: Should reject login with invalid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'nonexistent@example.com', password: 'wrongpassword' });

      expect(res.statusCode).toBe(401);
      expect(res.body.message).toMatch(/invalid email or password/i);
    });
  });

  describe('Endpoint Security & RBAC Tests', () => {
    it('TC007: Should reject student list retrieval when no token is passed', async () => {
      const res = await request(app).get('/api/students');
      expect(res.statusCode).toBe(401);
      expect(res.body.message).toContain('Access denied');
    });

    it('TC008: Should reject access with an invalid token', async () => {
      const res = await request(app)
        .get('/api/students')
        .set('Authorization', 'Bearer invalid_garbage_token');

      expect(res.statusCode).toBe(403);
      expect(res.body.message).toContain('Invalid or expired token');
    });

    it('TC016: Should block STAFF role from deleting students (403 Forbidden)', async () => {
      const res = await request(app)
        .delete('/api/students/1')
        .set('Authorization', `Bearer ${staffToken}`);

      expect(res.statusCode).toBe(403);
      expect(res.body.message).toContain('Forbidden');
    });

    it('TC012: Should reject student creation with malformed email syntax', async () => {
      const res = await request(app)
        .post('/api/students')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'not-an-email',
          phone: '08012345678'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toContain('Invalid email format');
    });
  });
});