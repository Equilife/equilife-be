import request from 'supertest';
import app from '../../../app';

describe('Auth Routes', () => {

  describe('POST /api/auth/register', () => {

    it('should return 201 and a success message for valid data', async () => {
      const userData = {
        email: 'testuser@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({
        success: true,
        message: `User ${userData.email} registered successfully.`
      });
    });

    it('should return 400 for missing data', async () => {
      const userData = {
        email: 'testuser@example.com'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        success: false,
        message: 'Missing required fields'
      });
    });

  });

  describe('POST /api/auth/login', () => {
  });

});