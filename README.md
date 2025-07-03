# 📚 Bookstore API

A simple Node.js + JWT + JSON-file-based REST API for user authentication and book management.

---

## 📦 Project Structure

---

## 🚀 Setup Instructions

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/bookstore-api.git
cd bookstore-api
npm install

2. Configure JWT Secret
Update or create a config file config.js:

module.exports = {
  MI: {
    JWTPRIVATEKEY: 'your-secret-key' // use env vars in production
  }
};

3. Start the Server

node server.js
The server will run on http://localhost:3000



🔐 Authentication Endpoints

✅ Register
POST /auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "123456"
}


✅ Login
POST /auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "123456"
}

🔑 Response

{
  "token": "JWT_TOKEN_HERE"
}

📚 Book API Endpoints (Require JWT)
Use token in the header:
Authorization: <token>

📄 GET /books

GET /books?page=1&limit=10&genre=Drama
📄 GET /books/:id

GET /books/<book-id>

➕ POST /books
POST /books
Content-Type: application/json

{
  "title": "1984",
  "author": "George Orwell",
  "genre": "Dystopian",
  "publishedYear": 1949
}
✏️ PUT /books/:id
PUT /books/<book-id>
Content-Type: application/json

{
  "title": "Updated Title"
}

❌ DELETE /books/:id
DELETE /books/<book-id>

🧪 Testing with curl
Register
curl -X POST http://localhost:3000/auth/register \
-H "Content-Type: application/json" \
-d '{"email":"user@example.com", "password":"pass123"}'

Login & Copy Token
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"user@example.com", "password":"pass123"}'

Add Book
curl -X POST http://localhost:3000/books \
-H "Authorization: Bearer <your_token>" \
-H "Content-Type: application/json" \
-d '{"title":"The Hobbit","author":"Tolkien","genre":"Fantasy","publishedYear":1937}'

📌 Notes
JSON is used for storage; no database setup needed.

Only the creator of a book can edit or delete it.

Logger middleware logs all requests to the console.

Error handlers for 404 and server errors included.

