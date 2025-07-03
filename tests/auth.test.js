jest.mock('../utils/fileUtils');
const request = require('supertest');
const app = require('../server');
const { readUsersFromFile, writeUsersToFile } = require('../utils/fileUtils');

jest.mock('../utils/fileUtils');

describe('Auth API', () => {
  beforeEach(() => {
    readUsersFromFile.mockResolvedValue([]);
    writeUsersToFile.mockResolvedValue();
  });

  test('Register new user', async () => {
    const res = await request(app).post('/auth/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('user_id');
  });

  test('Login with correct credentials', async () => {
    readUsersFromFile.mockResolvedValue([
      {
        user_id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: await require('bcryptjs').hash('password123', 10)
      }
    ]);
    const res = await request(app).post('/auth/login').send({
      email: 'test@example.com',
      password: 'password123'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
