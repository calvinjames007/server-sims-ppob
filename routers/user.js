const express = require('express');
const router = express.Router();
const {authentication} = require('../middlewares/authentication');
const userController = require('../controllers/userController');

router.post('/register', userController.registerNewUser);
router.post('/login', userController.loginUser);

router.use(authentication);

router.get('/readUserProfile', userController.readUserProfile);
router.put('/editUserProfile', userController.editUserProfile);

module.exports = router