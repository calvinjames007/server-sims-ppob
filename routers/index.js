const express = require('express');
const router = express.Router();
const userSection = require('./user');

router.use('/user', userSection);   

module.exports = router