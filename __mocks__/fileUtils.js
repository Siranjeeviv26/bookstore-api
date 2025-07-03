let users = [];
let books = [];

module.exports = {
  readUsersFromFile: jest.fn(() => Promise.resolve(users)),
  writeUsersToFile: jest.fn((newUsers) => {
    users = newUsers;
    return Promise.resolve();
  }),
  readBooksFromFile: jest.fn(() => Promise.resolve(books)),
  writeBooksToFile: jest.fn((newBooks) => {
    books = newBooks;
    return Promise.resolve();
  }),
};

