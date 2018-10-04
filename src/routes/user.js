const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

router.post('/signup', userController.user_signup);
router.post('/login', userController.user_login);
router.get('/find', userController.user_get);
router.delete('/:userId', userController.user_delete);

module.exports = router;