const express = require('express');
const router = express.Router();

const authorController = require('../controller/author');

router.post('/', authorController.create_author)
router.get('/', authorController.get_all_data_author)
router.delete('/:authorId', authorController.delete_author)
router.put('/:authorId', authorController.update_data)

module.exports = router;