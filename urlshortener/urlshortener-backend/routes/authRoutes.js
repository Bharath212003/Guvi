const express = require('express');
const { register, activateAccount } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/activate', activateAccount);

module.exports = router;
