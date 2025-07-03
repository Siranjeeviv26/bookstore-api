const { v4: uuidv4 } = require('uuid');
const { readBooksFromFile, writeBooksToFile } = require('../../utils/fileUtils');

//get all book and search by genre
exports.getAllBooks = async (req, res) => {
  const { genre, page = 1, limit = 10 } = req.query;
  const books = await readBooksFromFile();

  const filtered = genre ? books.filter(book => book.genre === genre) : books;
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + parseInt(limit));

  res.json({
    data: paginated,
    total: filtered.length,
    page: parseInt(page),
    limit: parseInt(limit)
  });
};

//get single book by id
exports.getBookById = async (req, res) => {
  const books = await readBooksFromFile();
  const book = books.find(b => b.id === req.params.id);

  if (!book) return res.status(404).json({ message: 'Book not found' });

  res.json(book);
};

//create new books
exports.createBook = async (req, res) => {
  const { title, author, genre, publishedYear } = req.body;

  if (!title || !author || !genre || !publishedYear) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const books = await readBooksFromFile();
  const newBook = {
    id: uuidv4(),
    title,
    author,
    genre,
    publishedYear,
    userId: req.authData.email
  };

  books.push(newBook);
  await writeBooksToFile(books);
  res.status(201).json(newBook);
};

//update the books by id
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const books = await readBooksFromFile();
  const bookIndex = books.findIndex(b => b.id === id);

  if (bookIndex === -1) return res.status(404).json({ message: 'Book not found' });

  if (books[bookIndex].userId !== req.authData.email) {
    return res.status(403).json({ message: 'You are not the owner of this book' });
  }

  books[bookIndex] = { ...books[bookIndex], ...req.body };
  await writeBooksToFile(books);
  res.json(books[bookIndex]);
};

//delete book by id
exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  const books = await readBooksFromFile();
  const bookIndex = books.findIndex(b => b.id === id);

  if (bookIndex === -1) return res.status(404).json({ message: 'Book not found' });

  if (books[bookIndex].userId !== req.authData.email) {
    return res.status(403).json({ message: 'You are not the owner of this book' });
  }

  books.splice(bookIndex, 1);
  await writeBooksToFile(books);
  res.json({ message: 'Book deleted successfully' });
};
