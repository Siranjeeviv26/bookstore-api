const express = require('express');
const router = express.Router();
const bookController = require('../controller/book');
const { validateToken } = require('../../utils/jwt');

router.get('/', validateToken, bookController.getAllBooks);
router.get('/:id', validateToken, bookController.getBookById);
router.post('/', validateToken, bookController.createBook);
router.put('/:id', validateToken, bookController.updateBook);
router.delete('/:id', validateToken, bookController.deleteBook);

module.exports = router;
