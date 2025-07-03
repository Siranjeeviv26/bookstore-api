const fs = require('fs').promises;
const path = require('path');

const USERS_FILE = path.join(__dirname, '../data/users.json');
const BOOKS_FILE = path.join(__dirname, '../data/book.json');

async function readUsersFromFile() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

async function writeUsersToFile(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

async function readBooksFromFile() {
  try {
    const data = await fs.readFile(BOOKS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

async function writeBooksToFile(books) {
  await fs.writeFile(BOOKS_FILE, JSON.stringify(books, null, 2));
}

module.exports = {
  readUsersFromFile,
  writeUsersToFile,
  readBooksFromFile,
  writeBooksToFile
};
