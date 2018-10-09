const express = require('express');
const router = express.Router();

const bookController = require('../controller/book');

router.patch('/:authorId', bookController.create_books)
router.get('/', bookController.get_all_data_book)

module.exports = router;