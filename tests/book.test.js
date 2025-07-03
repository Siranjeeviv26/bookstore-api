// Force consistent JWT secret
process.env.JWT_SECRET = 'your_jwt_secret';

jest.mock('../utils/fileUtils');

const request = require('supertest');
const app = require('../server');
const { readBooksFromFile, writeBooksToFile } = require('../utils/fileUtils');
const jwt = require('jsonwebtoken');

// Sign a valid raw token (no "Bearer " prefix needed)
const mockToken = jwt.sign(
  { userId: 1, email: 'test@example.com' },
  process.env.JWT_SECRET
);

describe('Books API (Raw JWT token)', () => {
  beforeEach(() => {
    readBooksFromFile.mockResolvedValue([]);
    writeBooksToFile.mockResolvedValue();
  });

  test('Create a new book with raw token', async () => {
    const res = await request(app)
      .post('/books')
      .set('Authorization', mockToken) // RAW token (no Bearer)
      .send({
        title: 'Book Title',
        author: 'Author Name',
        genre: 'Fiction',
        publishedYear: 2020
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Book Title');
    expect(res.body.userId).toBe('test@example.com'); // From authData.email
  });

  test('Get all books with raw token (empty)', async () => {
    const res = await request(app)
      .get('/books')
      .set('Authorization', mockToken); // ✅ RAW token (no Bearer)

    expect(res.statusCode).toBe(200);
    expect(res.body.total).toBe(0);
    expect(res.body.data).toEqual([]);
  });
});
